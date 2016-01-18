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
      $scope.createRoom = function(){
          $location.path('/create_room');
      };

      $scope.joinRoom = function(){
          if($scope.roomId){
              console.log("joinRoom");
              var roomPath = '/room/' + $scope.roomId;
              console.log("roomPath", roomPath);
              $location.path(roomPath);
          }
      };
  }]);
})();
