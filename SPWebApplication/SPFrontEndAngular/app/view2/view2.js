'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function ($scope) {


    $scope.room_name = "Sam's Playground";

    $scope.createPbi = function (newPbi) {
        if (newPbi && newPbi.length >= 1) {
            var Pbi = {
                "PBI_name": newPbi,
                "PBI_score": ""
            };
            $scope.pbiArray.push(Pbi);
            if ($scope.setPbiFocus) {
                document.getElementById("newPbi").focus();
                $scope.setPbiFocus = false;
            }
        }
    };


    $scope.removePbi = function (index) {
        $scope.pbiArray.splice(index, 1);
    };

    $scope.setEditablePbi = function (context,bool) {
        context.changeInput = bool;
    }

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