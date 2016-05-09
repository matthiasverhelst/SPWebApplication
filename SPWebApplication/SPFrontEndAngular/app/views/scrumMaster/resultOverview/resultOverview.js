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
      console.log("routeparams:");
      console.log($routeParams);
      $scope.participantsList = [];

      PubSub.subscribe('getUserEstimates', function (msg, participantsList) {
          $scope.participantsList = participantsList;
          console.log("ParticipantsList:");
          console.log($scope.participantsList);
          $timeout(function(){
              $scope.$apply();
          },0);
      });

      signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.GET_USER_ESTIMATES, "test");
  }]);
})();
