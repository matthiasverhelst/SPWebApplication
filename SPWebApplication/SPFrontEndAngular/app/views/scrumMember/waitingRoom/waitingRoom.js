'use strict';

(function () {
  angular.module('pokerShoreApp.waitingRoomScrumMember', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/waitingRoomScrumMember/:room', {
      templateUrl: 'views/scrumMember/waitingRoom/waitingRoom.html',
      controller: 'waitingRoomScrumMemberCtrl'
    });
  }])

  .controller('waitingRoomScrumMemberCtrl', ['$scope','$routeParams', '$http','$timeout','signalRSvc', function($scope, $routeParams, $http, $timeout,signalRSvc) {
      $scope.roomID = $routeParams.room;
      $scope.participantsList = [];

      PubSub.subscribe( 'getParticipants', function(msg, participantsList){
          $scope.participantsList = participantsList;
          $timeout(function(){
              $scope.$apply();
          },0);
      });

      signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.GET_PARTICIPANTS);
  }]);
})();
