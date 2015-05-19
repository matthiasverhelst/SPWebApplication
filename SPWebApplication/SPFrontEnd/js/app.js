var app = angular.module('pokerShore', []);

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
