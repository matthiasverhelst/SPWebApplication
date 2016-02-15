'use strict';

(function () {
    angular.module('pokerShoreApp.voting_screen', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/voting_screen', {
            templateUrl: 'views/voting_screen/voting_screen.html',
            controller: 'VotingCtrl'
        });
    }])

    .controller('VotingCtrl', ['$scope', function ($scope) {
        
    }]);
})();