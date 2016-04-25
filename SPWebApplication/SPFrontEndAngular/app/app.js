'use strict';

(function() {
  // Declare app level module which depends on views, and components
  var pokerShoreApp = angular.module('pokerShoreApp', [
    'ngRoute',
    'pokerShoreApp.home',
    'pokerShoreApp.waitingRoomScrumMaster',
    'pokerShoreApp.votingScrumMaster',
    'pokerShoreApp.waitingRoomScrumMember',
    'pokerShoreApp.view1',
    'pokerShoreApp.view2',
    'pokerShoreApp.voting',
    'pokerShoreApp.version'
    ]);

    pokerShoreApp.value('$', $);

    pokerShoreApp.service('signalRSvc', ['$', '$rootScope', function ($, $rootScope) {
        var proxy = null;
        var roomId = "";

        var initialize = function () {
            //Getting the connection object
            var connection = $.hubConnection("http://localhost:12345/signalr", { useDefaultPath: false });

            //Creating proxy
            this.proxy = connection.createHubProxy('scrumPokerHub');

            this.proxy.on('roomCreated', function (id) {
                roomId = id;
                PubSub.publish( 'roomCreated', id );
            });

            this.proxy.on('roomJoined', function (success) {
                PubSub.publish( 'roomJoined', success );
            });

            this.proxy.on('getParticipants', function (participantsList) {
                PubSub.publish( 'participantsListChanged', participantsList );
            });

            this.proxy.on('getPBIS', function (pbiArray) {
                console.log("getPBIS");
                console.log(pbiArray);
                PubSub.publish( 'getPBIList', pbiArray );
            });



            //Starting connection
            connection.start().done(function () {
                console.log("Connection established. Connect id: " + connection.id);
            }).fail(function (e) {
                console.log(e);
                console.log("Connection Failed.");
            });
        };




        var sendRequest = function (name, message) {
            //Invoking greetAll method defined in hub
            this.proxy.invoke('send', name, message);
        };

        var createRoom = function (name) {
            this.proxy.invoke('createRoom', name);
        };

        var joinRoom = function (name, id) {
            roomId = id;
            this.proxy.invoke('joinRoom', name, id);
        };

        var getParticipants = function () {
            this.proxy.invoke('getParticipants', roomId);
        };

        var createPBI = function (pbiName) {
            this.proxy.invoke('createPBI', roomId, pbiName);
        };

        var removePBI = function (pbiName) {
            this.proxy.invoke('removePBI', roomId, pbiName);
        };

        var getPBIS = function () {
            this.proxy.invoke('getPBIS', roomId);
        };

        var addEstimation = function (pbiName, score) {
            this.proxy.invoke('addEstimation', roomId, pbiName, score);
        }


        return {
            initialize: initialize,
            sendRequest: sendRequest,
            createRoom: createRoom,
            joinRoom: joinRoom,
            getParticipants: getParticipants,
            createPBI: createPBI,
            removePBI: removePBI,
            getPBIS: getPBIS,
            addEstimation: addEstimation
        };
    }]);

    pokerShoreApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);

    pokerShoreApp.controller('mainController', ['$scope', 'signalRSvc', function ($scope, signalRSvc) {

        signalRSvc.initialize();

    }]);
})();
