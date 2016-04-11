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

      $scope.createRoom = function () {
         $scope.createRoomFormSubmitted = true;
         signalRSvc.createRoom($scope.createRoomObj.scrumMasterName);
      };

      $scope.joinRoom = function(){
          $scope.errors={};
          $scope.joinRoomFormSubmitted = true;
          if($scope.joinRoomObj.roomId && $scope.joinRoomObj.scrumMemberName && $scope.joinRoomObj.roomId !== "" && $scope.joinRoomObj.scrumMemberName !== ""){
              signalRSvc.joinRoom($scope.joinRoomObj.scrumMemberName,$scope.joinRoomObj.roomId);
          }
      };


      PubSub.subscribe( 'roomJoined', function(msg, success){
          console.log("success", success);
          if(success){
              $scope.errors.invalidRoomId = false;
              var roomPath = '/room/' + $scope.joinRoomObj.roomId;
              $location.path(roomPath);
          }else{
              $scope.errors.invalidRoomId = true;
          }
          $timeout(function(){
              $scope.$apply();
          },0);
      });

      PubSub.subscribe( 'roomCreated', function(msg, roomId){
          var roomPath = '/room/' + roomId;
          $location.path(roomPath);
          $timeout(function(){
              $scope.$apply();
          },0);
      });
  }]);
})();
