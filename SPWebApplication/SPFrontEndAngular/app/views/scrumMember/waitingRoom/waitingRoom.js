'use strict';

(function () {
  angular.module('pokerShoreApp.waitingRoomScrumMember', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/waitingRoomScrumMember/:param1', {
      templateUrl: 'views/scrumMember/waitingRoom/waitingRoom.html',
      controller: 'waitingRoomScrumMemberCtrl'
    });
  }])

  .controller('waitingRoomScrumMemberCtrl', ['$scope','$routeParams', '$http', function($scope, $routeParams, $http) {
      var roomId = $routeParams;
      $scope.roomNum = roomId.param1;
  }]);
})();
