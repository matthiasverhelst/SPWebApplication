'use strict';

angular.module('pokerShoreApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'views/view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function ($scope) {


    $scope.room_name = "Sam's Playground";

    $scope.createPbi = function (newPbi) {
        console.log("createPbi");
        if (newPbi && newPbi.length >= 1) {
            var Pbi = {
                "PBI_name": newPbi,
                "PBI_score": ""
            };
            $scope.pbiArray.push(Pbi);
            if ($scope.setPbiFocus) {
                focusNewPbi();
            }
        }
    };

    var focusNewPbi = function () {
        console.log("focus");
        document.getElementById("newPbi").focus();
        $scope.setPbiFocus = false;
    }

    $scope.submit = function () {
        console.log("submit");
        document.activeElement.blur();
        //document.getElementById("newPbi").blur();
        focusNewPbi();
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


}])

