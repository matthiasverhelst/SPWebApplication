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

    }]);
})();