'use strict';

(function() {
  // Declare app level module which depends on views, and components
  var pokerShoreApp = angular.module('pokerShoreApp', [
    'ngRoute',
    'pokerShoreApp.home',
    'pokerShoreApp.room',
    'pokerShoreApp.view1',
    'pokerShoreApp.view2',
    'pokerShoreApp.voting',
    'pokerShoreApp.version'
    ]);

    pokerShoreApp.value('$', $);

    pokerShoreApp.service('signalRSvc', ['$', '$rootScope', function ($, $rootScope) {
        var proxy = null;

        var initialize = function () {
            //Getting the connection object
            var connection = $.hubConnection("http://localhost:50529");

            //Creating proxy
            this.proxy = connection.createHubProxy('scrumPokerHub');

            //Publishing an event when server pushes a greeting message
            this.proxy.on('broadcastMessage', function (name, message) {
                $rootScope.$emit("broadcastMessage", name, message);
            });

            //Starting connection
            connection.start().done(function () {
                console.log("Connection established. Connect id: " + connection.id);
            }).fail(function (e) {
                console.log(e);
                console.log(e.message);
                console.log(e.source);
                console.log(e.context);
                console.log("Connection Failed.");
            });
        };

        var sendRequest = function (name, message) {
            //Invoking greetAll method defined in hub
            this.proxy.invoke('send', name, message);
        };

        return {
            initialize: initialize,
            sendRequest: sendRequest
        };
    }]);

    pokerShoreApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);

    pokerShoreApp.controller('mainController', ['$scope', 'signalRSvc', function ($scope, signalRSvc) {

        signalRSvc.initialize();

    }]);
})();
