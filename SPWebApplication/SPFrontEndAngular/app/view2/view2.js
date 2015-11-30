'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {
    $scope.room_name = "Sam's Playground";

    $scope.showAddPbi = false;
    $scope.createPbi = function (newPbi) {
        var Pbi = {
            "PBI_name": newPbi,
            "PBI_score": ""
        };
        $scope.pbiArray.push(Pbi)
    };
    $scope.removePbi = function (index) {
        $scope.pbiArray.splice(index, 1);
    };

    $scope.pbiArray = [];

    $scope.connectedUsersArray = [
        {
            "username": "Sam Ghysels"
        },
        {
            "username": "Marijn Bel"
        },
        {
            "username": "Bram Dufour"
        }
    ];


}]);