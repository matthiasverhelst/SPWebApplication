'use strict';

(function() {
  // Declare app level module which depends on views, and components
  var pokerShoreApp = angular.module('pokerShoreApp', [
    'ngRoute',
    'pokerShoreApp.home',
    'pokerShoreApp.waitingRoomScrumMaster',
    'pokerShoreApp.votingScrumMaster',
    'pokerShoreApp.resultOverviewScrumMaster',
    'pokerShoreApp.waitingRoomScrumMember',
    'pokerShoreApp.votingScrumMember',
    'pokerShoreApp.resultOverviewScrumMember',
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
            GET_USER_ESTIMATES: 'GetUserEstimates',
            SHOW_ESTIMATES : 'ShowEstimates',
            CREATE_PBI: 'createPBI',
            REMOVE_PBI: 'removePBI',
            UPDATE_PBI: 'updatePBI',
            PUSH_PBI: 'pushPBI',
            ADD_ESTIMATE: 'addEstimation',
            SET_FINAL_ESTIMATE: 'setFinalEstimate'
        };

        var initialize = function () {
            //Getting the connection object
            var connection = $.hubConnection("http://localhost:12345/signalr", { useDefaultPath: false });

            //Creating proxy
            this.proxy = connection.createHubProxy('scrumPokerHub');

            var createProxyListener = function(proxyObj, proxyID){
                proxyObj.on(proxyID, function (obj){
                    console.log(proxyID);
                    if(proxyID === "roomCreated"){
                        roomId = obj;
                    }
                    PubSub.publish(proxyID, obj );
                });
            };

            var onProxyVarsArray = ['roomCreated', 'roomJoined', 'getParticipants', 'getPBIS', 'PBIPushed', 'PBIUpdated', 'addedEstimation', 'getUserEstimates', 'showEstimates', 'finalEstimateSet'];

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
            console.log(reqName);
            console.log(obj);
            this.proxy.invoke(reqName, obj);
        };

        var sendRequestWithRoomID = function (reqName, obj) {
            if (obj) {
                this.proxy.invoke(reqName, roomId, obj);
            } else {
                this.proxy.invoke(reqName, roomId);
            }
        };

        var getRoomId = function() {
                return roomId;
        };

        var setRoomId = function(id){
            roomId = id;
        };

        return {
            initialize: initialize,
            CONST : CONST,
            sendRequest: sendRequest,
            sendRequestWithRoomID : sendRequestWithRoomID,
            getRoomId : getRoomId,
            setRoomId : setRoomId
        };
    }]);

    pokerShoreApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);

    pokerShoreApp.controller('mainController', ['$scope', 'signalRSvc', function ($scope, signalRSvc) {
        signalRSvc.initialize();
    }]);
})();
