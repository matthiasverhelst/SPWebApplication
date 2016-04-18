'use strict';

(function () {
  angular.module('pokerShoreApp.waitingRoomScrumMaster', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/waitingRoomScrumMaster/:param1', {
      templateUrl: 'views/scrumMaster/waitingRoom/waitingRoom.html',
      controller: 'waitingRoomScrumMasterCtrl'
    });
  }])

  .controller('waitingRoomScrumMasterCtrl', ['$scope','$routeParams', '$http','$timeout','signalRSvc', function($scope, $routeParams, $http, $timeout,signalRSvc) {
      var roomId = $routeParams;
      $scope.roomNum = roomId.param1;
      $scope.participantsList = [];


      PubSub.subscribe( 'participantsListChanged', function(msg, participantsList){
          $scope.participantsList = participantsList;
          $timeout(function(){
              $scope.$apply();
          },0);
      });

      signalRSvc.getParticipants($scope.roomNum);
  }]);
})();
