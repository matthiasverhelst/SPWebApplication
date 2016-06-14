'use strict';

(function () {
    angular.module('pokerShoreApp.resultOverviewScrumMember', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/resultOverviewScrumMember/:pbiName/:showEstimates', {
        templateUrl: 'views/scrumMember/resultOverview/resultOverview.html',
        controller: 'resultOverviewScrumMemberCtrl'
    });
  }])

  .controller('resultOverviewScrumMemberCtrl', ['$scope', '$routeParams', '$http', '$timeout', 'signalRSvc', '$location', function ($scope, $routeParams, $http, $timeout, signalRSvc, $location) {
      $scope.pbiName = $routeParams.pbiName;
      $scope.participantsList = [];
      $scope.showEstimates = ($routeParams.showEstimates === 'true');
      console.log("pbiname: " + $scope.pbiName);
      console.log("showEstimates: " + $scope.showEstimates);

      PubSub.subscribe('getUserEstimates', function (msg, participantsList) {
          $scope.participantsList = participantsList;
          $timeout(function(){
              $scope.$apply();
          }, 0);
      });

      PubSub.subscribe('PBIPushed', function (msg, pbiName) {
          var pathString = "/votingScrumMember/" + pbiName;
          $location.path(pathString);
          $timeout(function () {
              $scope.$apply();
          }, 0);
      });

      PubSub.subscribe('showEstimates', function (msg) {
          console.log("Showing estimates...");
          $scope.showEstimates = true;
          $timeout(function () {
              $scope.$apply();
          }, 0);
      });

//      PubSub.subscribe('finalEstimateSet', function (msg, estimate) {
//         console.log("final estimate: " + estimate);
//          if (estimate != false) {
//             var pathString = "/seeFinalEstimate/";
//              $location.path(pathString);
//          }
//      });

      signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.GET_USER_ESTIMATES, $scope.pbiName);
  }]);
})();
