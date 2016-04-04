'use strict';

(function () {
    angular.module('pokerShoreApp.home', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'views/home/home.html',
      controller: 'HomeCtrl'
    });
  }])

  .controller('HomeCtrl', ['$scope', '$http', '$location', '$rootScope', 'signalRSvc', function ($scope, $http, $location, $rootScope, signalRSvc) {
      $scope.createRoomObj = {};
      $scope.joinRoomObj = {};
      $scope.errors = {};
      $scope.createRoomFormSubmitted = false;
      $scope.joinRoomFormSubmitted = false;

      $scope.createRoomSocket = function () {
          signalRSvc.createRoom("Sam");
      }

      $scope.createRoom = function () {
         $scope.createRoomFormSubmitted = true;

      };

      $scope.joinRoom = function(){
          $scope.errors={};
          $scope.joinRoomFormSubmitted = true;

          if($scope.joinRoomObj.roomId && $scope.joinRoomObj.scrumMemberName && $scope.joinRoomObj.roomId !== "" && $scope.joinRoomObj.scrumMemberName !== ""){
              if(checkForExistingroomId($scope.joinRoomObj.roomId)){
                  var roomPath = '/room/' + $scope.joinRoomObj.roomId;
                  $location.path(roomPath);
              }else{
                  $scope.errors.invalidRoomId = true;
              }
          }
      };
      var checkForExistingroomId = function(roomId){
          if(roomId === "123456"){
              return true;
          }else{
              return false;
          }
      };

      $scope.$on('roomCreated', function (id) {
          console.log("Hello you created a room with id: " + id);
      });
  }]);
})();
