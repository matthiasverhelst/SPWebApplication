'use strict';

(function () {
    angular.module('pokerShoreApp.resultOverviewScrumMember', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/resultOverviewScrumMember/:pbiName', {
        templateUrl: 'views/scrumMember/resultOverview/resultOverview.html',
        controller: 'resultOverviewScrumMemberCtrl'
    });
  }])

  .controller('resultOverviewScrumMemberCtrl', ['$scope', '$routeParams', '$http', '$timeout', 'signalRSvc', '$location', function ($scope, $routeParams, $http, $timeout, signalRSvc, $location) {
      $scope.pbiName = $routeParams.pbiName;
      $scope.participantsList = [];

      PubSub.subscribe('getUserEstimates', function (msg, participantsList) {
          $scope.participantsList = participantsList;
          $timeout(function(){
              $scope.$apply();
          },0);
      });

      PubSub.subscribe('PBIPushed', function (msg, pbiName) {
          var pathString = "/votingScrumMember/" + pbiName;
          $location.path(pathString);
          $timeout(function () {
              $scope.$apply();
          }, 0);
      });

      signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.GET_USER_ESTIMATES, $scope.pbiName);
  }]);
})();