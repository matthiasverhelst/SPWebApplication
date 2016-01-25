'use strict';

(function() {

  // Declare app level module which depends on views, and components
  var pokerShoreApp = angular.module('pokerShoreApp', [
    'ngRoute',
    'pokerShoreApp.home',
    'pokerShoreApp.room',
    'pokerShoreApp.createRoom',
    'pokerShoreApp.joinRoom',
    'pokerShoreApp.view1',
    'pokerShoreApp.view2',
    'pokerShoreApp.version'
    ]);

 pokerShoreApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);

  pokerShoreApp.controller('mainController', function($scope) {


  });
})();
