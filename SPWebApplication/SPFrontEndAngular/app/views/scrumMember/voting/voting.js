'use strict';

(function () {
    angular.module('pokerShoreApp.votingScrumMember', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/votingScrumMember/:pbi', {
            templateUrl: 'views/scrumMember/voting/voting.html',
            controller: 'VotingCtrlScrumMember'
        });
    }])

    .controller('VotingCtrlScrumMember', ['$scope', '$location', '$timeout', '$routeParams', 'signalRSvc', function ($scope, $location, $timeout, $routeParams, signalRSvc) {
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
            signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.ADD_ESTIMATE, voteObj);
        }

        PubSub.subscribe('addedEstimation', function (msg, succes) {
            if (succes) {
                $scope.goToResultOverview();
            }
        });

        $scope.goToResultOverview = function () {
            var pathString = "/resultOverviewScrumMember/" + $scope.pbiName;
            $location.path(pathString);
            $timeout(function () {
                $scope.$apply();
            }, 0);
        };
    }]);
})();