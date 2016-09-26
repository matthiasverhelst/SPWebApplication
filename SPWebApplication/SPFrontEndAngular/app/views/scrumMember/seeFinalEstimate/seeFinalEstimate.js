'use strict';

(function () {
    angular.module('pokerShoreApp.seeFinalEstimateScrumMember', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/seeFinalEstimateScrumMember/:finalEstimate/:pbiName', {
        templateUrl: 'views/scrumMember/seeFinalEstimate/seeFinalEstimate.html',
        controller: 'seeFinalEstimateScrumMemberCtrl'
    });
  }])

  .controller('seeFinalEstimateScrumMemberCtrl', ['$scope', '$routeParams', '$http', '$timeout', 'signalRSvc', '$location', function ($scope, $routeParams, $http, $timeout, signalRSvc, $location) {
      $scope.finalEstimate = $routeParams.finalEstimate;
      $scope.pbiName = $routeParams.pbiName;

  }]);
})();
