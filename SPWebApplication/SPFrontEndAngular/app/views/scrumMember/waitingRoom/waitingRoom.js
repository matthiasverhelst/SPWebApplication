'use strict';

(function () {
  angular.module('pokerShoreApp.waitingRoomScrumMember', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/waitingRoomScrumMember/:param1', {
      templateUrl: 'views/scrumMember/waitingRoom/waitingRoom.html',
      controller: 'waitingRoomScrumMemberCtrl'
    });
  }])

  .controller('waitingRoomScrumMasterCtrl', ['$scope','$routeParams', '$http','$timeout', function($scope, $routeParams, $http, $timeout) {
      var roomId = $routeParams;
      $scope.roomNum = roomId.param1;
      $scope.participantsList = [];

      PubSub.subscribe( 'participantsListChanged', function(msg, participantsList){
          $scope.participantsList = participantsList;
          console.log(participantsList);
          $timeout(function(){
              $scope.$apply();
          },0);
      } );
  }]);
})();
