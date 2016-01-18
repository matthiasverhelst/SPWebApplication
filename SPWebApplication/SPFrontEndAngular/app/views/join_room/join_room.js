'use strict';

(function () {
  angular.module('pokerShoreApp.joinRoom', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/join_room', {
      templateUrl: 'views/join_room/join_room.html',
      controller: 'JoinRoomCtrl'
    });
  }])

  .controller('JoinRoomCtrl', ['$scope', '$http', function($scope, $http) {

  }]);
})();
