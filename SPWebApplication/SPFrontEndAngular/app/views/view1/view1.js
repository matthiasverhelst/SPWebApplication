'use strict';

(function () {
  angular.module('pokerShoreApp.view1', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'views/view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
      $scope.pbi = {
        id: '123',
        userHash: 'ABC123',
        estimate: undefined
      };

      $scope.addEstimateToPBI = function () {

        var res = $http.post('http://localhost:12345/api/ScrumPoker/Estimate', $scope.pbi);

        res.success(function (data, status, headers, config) {
          $scope.message = data;
          console.log('Succeeded to post estimate. Statuscode: ' + status);
        });

        res.error(function (data, status, headers, config) {
          console.log('Failed to post estimate. Statuscode: ' + status);
        });
      };
  }]);
})();
