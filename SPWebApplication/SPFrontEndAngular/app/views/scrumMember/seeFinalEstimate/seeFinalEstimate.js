'use strict';

(function () {
    angular.module('pokerShoreApp.finalEstimateScrumMember', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/finalEstimateScrumMember', {
        templateUrl: 'views/scrumMember/seeFinalEstimate/resultOverview.html',
        controller: 'finalEstimateScrumMemberCtrl'
    });
  }])

  .controller('finalEstimateScrumMemberCtrl', ['$scope', '$routeParams', '$http', '$timeout', 'signalRSvc', '$location', function ($scope, $routeParams, $http, $timeout, signalRSvc, $location) {

  }]);
})();
