'use strict';

(function () {
  angular.module('pokerShoreApp.waitingRoomScrumMember', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/waitingRoomScrumMember/:param1', {
      templateUrl: 'views/scrumMember/waitingRoom/waitingRoom.html',
      controller: 'waitingRoomScrumMemberCtrl'
    });
  }])

  .controller('waitingRoomScrumMemberCtrl', ['$scope','$routeParams', '$http','$timeout','signalRSvc', function($scope, $routeParams, $http, $timeout,signalRSvc) {
      var roomId = $routeParams;
      $scope.roomNum = roomId.param1;
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
