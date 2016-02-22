'use strict';

(function () {
  angular.module('pokerShoreApp.home', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'views/home/home.html',
      controller: 'HomeCtrl'
    });
  }])

  .controller('HomeCtrl', ['$scope', '$http','$location', function($scope, $http, $location) {
      $scope.createRoomObj = {};
      $scope.joinRoomObj = {};
      $scope.errors = {};

      $scope.createRoom = function(){
          console.log($scope.createRoomObj);
      };

      $scope.joinRoom = function(){
          $scope.errors.emptyFieldsJoinRoom = false;
          $scope.errors.invalidRoomId = false;
          console.log($scope.joinRoomObj);
          if($scope.joinRoomObj.roomId && $scope.joinRoomObj.scrumMemberName && $scope.joinRoomObj.roomId !== "" && $scope.joinRoomObj.scrumMemberName !== ""){
              if(checkForExistingroomId()){
                  var roomPath = '/room/' + $scope.roomId;
                  $location.path(roomPath);
              }else{
                  $scope.errors.invalidRoomId = true;
              }
          }else{
              $scope.errors.emptyFieldsJoinRoom = true;
          }
      };


      var checkForExistingroomId = function(){
          return false;
      };
  }]);
})();
