'use strict';

(function () {
    angular.module('pokerShoreApp.setFinalEstimate', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/setFinalEstimate/:pbi', {
            templateUrl: 'views/scrumMaster/setFinalEstimate/setFinalEstimate.html',
            controller: 'SetFinalEstimateCtrl'
        });
    }])

    .controller('SetFinalEstimateCtrl', ['$scope', '$location', '$timeout', '$routeParams', 'signalRSvc', function ($scope, $location, $timeout, $routeParams, signalRSvc) {
        $scope.pbiName = $routeParams.pbi;
        $scope.buttons = [
            { value: '0', text: '0' }, { value: '0.5', text: '0.5' }, { value: '1', text: '1' },
            { value: '2', text: '2' }, { value: '3', text: '3' }, { value: '5', text: '5' },
            { value: '8', text: '8' }, { value: '13', text: '13' }, { value: '20', text: '20' },
            { value: '40', text: '40' }, { value: '100', text: '100' }, { value: '?', text: '?' },
            { value: 'coffee', text: 'I need a coffee...' }
        ];

        $scope.vote = function vote(score) {
            var voteObj = { "pbiName": $scope.pbiName, "estimate": score };
            signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.SET_FINAL_ESTIMATE, voteObj);
        };

        PubSub.subscribe('finalEstimateSet', function (msg, success) {
            if (success !== false) {
                $scope.goToWaitingRoom();
            }
        });

        $scope.goToWaitingRoom = function () {
            var pathString = "/waitingRoomScrumMaster/" + signalRSvc.getRoomId();
            $location.path(pathString);
            $timeout(function () {
                $scope.$apply();
            }, 0);
        };
    }]);
})();
