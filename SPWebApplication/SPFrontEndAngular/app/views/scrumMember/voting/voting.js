'use strict';

(function () {
    angular.module('pokerShoreApp.voting', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/voting/:pbi', {
            templateUrl: 'views/voting/voting.html',
            controller: 'VotingCtrl'
        });
    }])

    .controller('VotingCtrl', ['$scope', '$location', '$routeParams', 'signalRSvc', function ($scope, $location, $routeParams, signalRSvc) {
        $scope.pbiName = $routeParams.pbi;
        $scope.rows = [
            {
                "buttons": [{ value: '0', text: '0' }, { value: '0.5', text: '0.5' }, { value: '1', text: '1' }]
            }, {
                "buttons": [{ value: '2', text: '2' }, { value: '3', text: '3' }, { value: '5', text: '5' }]
            }, {
                "buttons": [{ value: '8', text: '8' }, { value: '13', text: '13' }, { value: '20', text: '20' }]
            }, {
                "buttons": [{ value: '40', text: '40' }, { value: '100', text: '100' }, { value: '?', text: '?' }]
            }, {
                "buttons": [{ value: 'coffee', text:'I need a coffee...'}]
            }
        ];

        $scope.vote = function vote(score) {
            var voteObj = { "pbiName": $scope.pbiName, "estimate": score };
            signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.ADD_ESTIMATE, voteObj);
            //var roomPath = '/waitingRoomScrumMember/';
            //$location.path(roomPath);
        }

        //To update the view after PubSub, use setTimeout of 0ms to call $scope.apply()
    }]);
})();