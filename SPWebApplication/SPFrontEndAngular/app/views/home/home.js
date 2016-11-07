'use strict';

(function () {
    angular.module('pokerShoreApp.home', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'views/home/home.html',
      controller: 'HomeCtrl'
    });
  }])

  .controller('HomeCtrl', ['$scope', '$http', '$location', '$rootScope', 'signalRSvc','$timeout', function ($scope, $http, $location, $rootScope, signalRSvc, $timeout) {
      $scope.createRoomObj = {};
      $scope.joinRoomObj = {};
      $scope.errors = {};
      $scope.createRoomFormSubmitted = false;
      $scope.joinRoomFormSubmitted = false;
      $scope.date = new Date();

      $scope.createRoom = function () {
          $scope.createRoomFormSubmitted = true;
          if ($scope.createRoomObj.scrumMasterName && $scope.createRoomObj.scrumMasterName !== "") {
              signalRSvc.sendRequest(signalRSvc.CONST.CREATE_ROOM, $scope.createRoomObj.scrumMasterName);
          }
      };

      $scope.joinRoom = function(){
          $scope.errors={};
          $scope.joinRoomFormSubmitted = true;
          if($scope.joinRoomObj.roomId && $scope.joinRoomObj.scrumMemberName && $scope.joinRoomObj.roomId !== "" && $scope.joinRoomObj.scrumMemberName !== ""){
              var scrumMemberObj = {
                  roomId : $scope.joinRoomObj.roomId,
                  name : $scope.joinRoomObj.scrumMemberName
              };
              signalRSvc.sendRequest(signalRSvc.CONST.JOIN_ROOM, scrumMemberObj);
          }
      };

      PubSub.subscribe( 'roomJoined', function(msg, success){
          if (success) {
              $scope.errors.invalidRoomId = false;
              signalRSvc.setRoomId($scope.joinRoomObj.roomId);
              signalRSvc.setSessionStorage($scope.joinRoomObj.roomId, $scope.joinRoomObj.scrumMemberName, false);
              var roomPath = '/waitingRoomScrumMember/' + $scope.joinRoomObj.roomId;
              $location.path(roomPath);
          }else{
              $scope.errors.invalidRoomId = true;
          }
          $timeout(function(){
              $scope.$apply();
          },0);
      });

      PubSub.subscribe( 'roomCreated', function(msg, roomId){
          var roomPath = '/waitingRoomScrumMaster/' + roomId;
          signalRSvc.setSessionStorage($scope.joinRoomObj.roomId, $scope.joinRoomObj.scrumMasterName, true);
          $location.path(roomPath);
          $timeout(function(){
              $scope.$apply();
          },0);
      });
  }]);
})();
