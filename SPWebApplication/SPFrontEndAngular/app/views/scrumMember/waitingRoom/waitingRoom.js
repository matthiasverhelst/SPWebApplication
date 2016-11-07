'use strict';

(function () {
  angular.module('pokerShoreApp.waitingRoomScrumMember', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/waitingRoomScrumMember/:room', {
      templateUrl: 'views/scrumMember/waitingRoom/waitingRoom.html',
      controller: 'waitingRoomScrumMemberCtrl'
    });
  }])

  .controller('waitingRoomScrumMemberCtrl', ['$scope','$routeParams', '$http','$timeout','signalRSvc','$location', function($scope, $routeParams, $http, $timeout,signalRSvc,$location) {
      $scope.roomID = signalRSvc.getRoomId();
      $scope.participantsList = [];

      PubSub.subscribe( 'getParticipants', function(msg, participantsList){
          $scope.participantsList = participantsList;
          $timeout(function(){
              $scope.$apply();
          },0);
      });

      PubSub.subscribe( 'PBIPushed', function(msg, pbiName){
          var pathString = "/votingScrumMember/" + pbiName;
          $location.path(pathString);
          $timeout(function(){
              $scope.$apply();
          },0);
      });

      signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.GET_PARTICIPANTS);
  }]);
})();
