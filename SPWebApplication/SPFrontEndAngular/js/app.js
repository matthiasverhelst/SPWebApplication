(function () {
    var app = angular.module('pokerShore', []);

    app.controller('AddEstimateController', ['$scope', '$http', function ($scope, $http) {
        $scope.pbi = {

            id: '123',
            userHash: 'ABC123',
            estimate: undefined

        };

        $scope.addEstimateToPBI = function () {

            var res = $http.post('http://localhost:50529/TestService.svc/AddEstimate', $scope.pbi);

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