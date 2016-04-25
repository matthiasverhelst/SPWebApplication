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

    pokerShoreApp.service('signalRSvc', ['$', '$rootScope','$timeout', function ($, $rootScope,$timeout) {
        var proxy = null;
        var roomId = "";

        var CONST = {
            CREATE_ROOM : 'createRoom',
            JOIN_ROOM : 'joinRoom',
            GET_PARTICIPANTS : 'GetParticipants',
            GET_PBIS : 'GetPBIs',
            CREATE_PBI : 'createPBI',
            REMOVE_PBI : 'removePBI'
        };

        var initialize = function () {
            //Getting the connection object
            var connection = $.hubConnection("http://localhost:12345/signalr", { useDefaultPath: false });

            //Creating proxy
            this.proxy = connection.createHubProxy('scrumPokerHub');

            var createProxyListener = function(proxyObj, proxyID){
                proxyObj.on(proxyID, function (obj){
                    if(proxyID === "roomCreated"){
                        roomId = obj;
                    }
                    PubSub.publish(proxyID, obj );
                });
            };

            var onProxyVarsArray = ['roomCreated', 'roomJoined', 'getParticipants', 'getPBIS'];

            for(var i = 0; i < onProxyVarsArray.length; i++){
                createProxyListener(this.proxy, onProxyVarsArray[i]);
            }

            //Starting connection
            connection.start().done(function () {
                console.log("Connection established. Connect id: " + connection.id);
            }).fail(function (e) {
                console.log(e);
                console.log("Connection Failed.");
            });
        }

        var sendRequest = function (reqName, obj) {
            this.proxy.invoke(reqName, obj);
        };

        var sendRequestWithRoomID = function (reqName, obj) {
            if (obj){
                this.proxy.invoke(reqName, roomId, obj);
            }else{
                this.proxy.invoke(reqName, roomId);
            }
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
            CONST : CONST,
            sendRequest: sendRequest,
            createRoom: createRoom,
            joinRoom: joinRoom,
            getParticipants: getParticipants,
            createPBI: createPBI,
            removePBI: removePBI,
            getPBIS: getPBIS,
            addEstimation: addEstimation,
            sendRequestWithRoomID : sendRequestWithRoomID
        };
    }]);

    pokerShoreApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);

    pokerShoreApp.controller('mainController', ['$scope', 'signalRSvc', function ($scope, signalRSvc) {
        signalRSvc.initialize();
    }]);
})();
