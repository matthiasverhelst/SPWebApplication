'use strict';

(function () {
    angular.module('pokerShoreApp.voting', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/voting', {
            templateUrl: 'views/voting/voting.html',
            controller: 'VotingCtrl'
        });
    }])

    .controller('VotingCtrl', ['$scope', function ($scope) {
        $scope.rows = [
            {
                "buttons": [{ value: '0', text: '0' }, { value: '0.5', text: '0.5' }, { value: '1', text: '1' }],
                "col": "col-xs-4 col-sm-2"
            }, {
                "buttons": [{ value: '2', text: '2' }, { value: '3', text: '3' }, { value: '5', text: '5' }],
                "col": "col-xs-4 col-sm-2"
            }, {
                "buttons": [{ value: '8', text: '8' }, { value: '13', text: '13' }, { value: '20', text: '20' }],
                "col": "col-xs-4 col-sm-2"
            }, {
                "buttons": [{ value: '40', text: '40' }, { value: '100', text: '100' }, { value: '?', text: '?' }],
                "col": "col-xs-4 col-sm-2"
            }, {
                "buttons": [{ value: 'coffee', text:'I need a coffee...', 'class': 'btn-block-full-width' }],
                "col": "col-xs-12 col-sm-6"
            }];

        $scope.vote = function vote(points) {
            $scope.score = points;
        }
    }]);
})();