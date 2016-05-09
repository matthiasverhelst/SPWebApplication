'use strict';

(function () {
    angular.module('pokerShoreApp.resultOverviewScrumMaster', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/resultOverview/:pbiName', {
        templateUrl: 'views/scrumMaster/resultOverview/resultOverview.html',
        controller: 'resultOverviewScrumMasterCtrl'
    });
  }])

  .controller('resultOverviewScrumMasterCtrl', ['$scope', '$routeParams', '$http', '$timeout', 'signalRSvc', '$location', function ($scope, $routeParams, $http, $timeout, signalRSvc, $location) {
      $scope.roomID = $routeParams.room;
      $scope.participantsList = [];
      

      PubSub.subscribe( 'getPBIS', function(msg, pbiArray){
          console.log("pbiArray");
          console.log(pbiArray);
          $scope.pbiArray = pbiArray;
          $timeout(function(){
              $scope.$apply();
          },0);
      });

      PubSub.subscribe('getParticipants', function(msg, participantsList){
          $scope.participantsList = participantsList;
          $timeout(function(){
              $scope.$apply();
          },0);
      });



      signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.GET_PARTICIPANTS);
      signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.GET_PBIS);
  }]);
})();
