'use strict';

(function () {
  angular.module('pokerShoreApp.room', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/room/:param1', {
      templateUrl: 'views/room/room.html',
      controller: 'RoomCtrl'
    });
  }])

  .controller('RoomCtrl', ['$scope','$routeParams', '$http', function($scope, $routeParams, $http) {
      var roomId = $routeParams;
      $scope.roomNum = roomId.param1;
  }]);
})();
