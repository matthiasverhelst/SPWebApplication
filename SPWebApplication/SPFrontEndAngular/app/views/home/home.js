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
      $scope.createRoomFormSubmitted = false;
      $scope.joinRoomFormSubmitted = false;


      $scope.createRoom = function(){
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
  }]);
})();
