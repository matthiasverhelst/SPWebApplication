'use strict';

(function () {
    angular.module('pokerShoreApp.votingScrumMaster', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/votingScrumMaster/:pbiName', {
            templateUrl: 'views/scrumMaster/voting/voting.html',
            controller: 'VotingCtrlScrumMaster'
        });
    }])
    .controller('VotingCtrlScrumMaster', ['$scope', '$location', '$timeout', '$routeParams', 'signalRSvc', function ($scope, $location, $timeout, $routeParams, signalRSvc) {
        $scope.roomID = signalRSvc.getRoomId();
        $scope.pbiName = $routeParams.pbiName;
        $scope.buttons = [
            { value: '0', text: '0' }, { value: '0.5', text: '1/2' }, { value: '1', text: '1' },
            { value: '2', text: '2' }, { value: '3', text: '3' }, { value: '5', text: '5' },
            { value: '8', text: '8' }, { value: '13', text: '13' }, { value: '20', text: '20' },
            { value: '40', text: '40' }, { value: '100', text: '100' }, { value: '?', text: '?' },
            { value: 'coffee', text: 'I need a coffee...' }
        ];

        $scope.vote = function vote(score) {
            var voteObj = { "pbiName": $scope.pbiName, "estimate": score };
            signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.ADD_ESTIMATE, voteObj);
        }

        $scope.abortVoting = function () {
            signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.ABORT_VOTING, null);
        }

        PubSub.subscribe('addedEstimation', function (msg, succes) {
            if (succes) {
                $scope.goToResultOverview();
            }
        });

        PubSub.subscribe('showEstimates', function (msg) {
            $scope.goToResultOverview(true);
        });

        PubSub.subscribe('votingAborted', function (msg, succes) {
            var pathString = "/waitingRoomScrumMaster/" + signalRSvc.getRoomId();
            $location.path(pathString);
            $timeout(function () {
                $scope.$apply();
            }, 0);
        });

        $scope.goToResultOverview = function (showEstimates) {
            var pathString = "/resultOverviewScrumMaster/" + $scope.pbiName+ "/" + showEstimates;
            $location.path(pathString);
            $timeout(function () {
                $scope.$apply();
            }, 0);
        };
    }]);
})();
