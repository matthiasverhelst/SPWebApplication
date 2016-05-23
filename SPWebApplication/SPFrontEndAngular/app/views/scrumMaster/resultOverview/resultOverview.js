'use strict';

(function () {
    angular.module('pokerShoreApp.resultOverviewScrumMaster', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/resultOverviewScrumMaster/:pbiName', {
        templateUrl: 'views/scrumMaster/resultOverview/resultOverview.html',
        controller: 'resultOverviewScrumMasterCtrl'
    });
  }])

  .controller('resultOverviewScrumMasterCtrl', ['$scope', '$routeParams', '$http', '$timeout', 'signalRSvc', '$location', function ($scope, $routeParams, $http, $timeout, signalRSvc, $location) {
      $scope.pbiName = $routeParams.pbiName;
      $scope.participantsList = [];
      $scope.showEstimates = false;

      PubSub.subscribe('getUserEstimates', function (msg, participantsList) {
          $scope.participantsList = participantsList;
          $timeout(function() {
              $scope.$apply();
          },0);
      });

      PubSub.subscribe('showEstimates', function (msg) {
          console.log("Showing estimates...");
          $scope.showEstimates = true;
          $timeout(function () {
              $scope.$apply();
          }, 0);
      });

      PubSub.subscribe('PBIPushed', function (msg, pbiName) {
          var pathString = "/votingScrumMaster/" + pbiName;
          $location.path(pathString);
          $timeout(function () {
              $scope.$apply();
          }, 0);
      });

      $scope.pushPbi = function () {
          signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.PUSH_PBI, $scope.pbiName);
      };

      $scope.hasVoted = function (score) {
          if (score == 0) {
              return false;
          } else {
              return true;
          };
      };

      $scope.goToWaitingRoom = function () {
          var pathString = "/waitingRoomScrumMaster/" + signalRSvc.getRoomId();
          $location.path(pathString);
      };

      $scope.pushEstimates = function () {
          signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.SHOW_ESTIMATES, null);
      };

      signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.GET_USER_ESTIMATES, $scope.pbiName);
  }]);
})();
