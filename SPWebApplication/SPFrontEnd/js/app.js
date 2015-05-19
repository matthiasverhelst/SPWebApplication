(function () {
    var app = angular.module('pokerShore', []);

    app.controller('SelectEstimateController', ['$scope', '$http', function ($scope, $http) {
        $scope.addEstimateToBPI = function () {	
            var dataObj = {
                /*
                pbi_id: $scope.pbi_id,
                participant_hash: $scope.participant_hash,
                estimate: $scope.estimate
                */
                pbi_id: '123',
                participant_hash: 'ABC123',
                estimate: 8
            };

            var res = $http.post('/', dataObj);

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