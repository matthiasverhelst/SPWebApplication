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
      $scope.pbiName = $routeParams.pbiName;
      $scope.participantsList = [];

      PubSub.subscribe('getUserEstimates', function (msg, participantsList) {
          $scope.participantsList = participantsList;
          console.log("ParticipantsList:", $scope.participantsList);
          $timeout(function(){
              $scope.$apply();
          },0);
      });

      $scope.goToWaitingRoom = function () {
          var pathString = "/resultOverview/" + $scope.pbiName;
          console.log("path: ", pathString);
          $location.path(pathString);
      };

      signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.GET_USER_ESTIMATES, $scope.pbiName);
  }]);
})();
