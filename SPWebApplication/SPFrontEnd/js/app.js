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
    
    app.controller('MainCtrl', [
    '$scope',
    function ($scope) {
        $scope.listOfEst = [];
        $scope.addEst = function () {
            if (!$scope.inputEstimation || $scope.inputEstimation === '') { return; }
            console.log($scope.listOfEst.length);
            if ($scope.listOfEst.length === 0) {
                $scope.listOfEst.push({ estimator: 'Steven', estimation: $scope.inputEstimation });
                $scope.inputEstimation = '';
            } else {
                $scope.listOfEst[0].estimation = $scope.inputEstimation;
                $scope.inputEstimation = '';
            }
        };
    }]);
})();