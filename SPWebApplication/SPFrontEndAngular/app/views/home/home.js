'use strict';

(function () {
  angular.module('pokerShoreApp.home', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'views/home/home.html',
      controller: 'HomeCtrl'
    });
  }])

  .controller('HomeRoomCtrl', ['$scope', '$http', function($scope, $http) {
      
  }]);
})();
