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
      $scope.roomID = signalRSvc.getRoomId();
      $scope.pbiName = $routeParams.pbiName;
      $scope.participantsList = [];
      $scope.showEstimates = false;
      $scope.date = new Date();

      $scope.hasVoted = function (score) {
          if (score === "") {
              return false;
          } else {
              return true;
          };
      };

      $scope.pushPbi = function () {
          signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.PUSH_PBI, $scope.pbiName);
      };

      $scope.goToWaitingRoom = function () {
          var pathString = "/waitingRoomScrumMaster/" + signalRSvc.getRoomId();
          $location.path(pathString);
      };

      $scope.finalEstimate = function () {
          var pathString = "/setFinalEstimate/" + $scope.pbiName;
          $location.path(pathString);
      };

      $scope.pushEstimates = function () {
          signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.SHOW_ESTIMATES, null);
      };

      PubSub.subscribe('getUserEstimates', function (msg, participantsList) {
          $scope.participantsList = participantsList;
          $timeout(function() {
              $scope.$apply();
          },0);
      });

      PubSub.subscribe('showEstimates', function (msg) {
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

      signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.GET_USER_ESTIMATES, $scope.pbiName);
  }]);
})();
