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
    'pokerShoreApp.setFinalEstimate',
    'pokerShoreApp.seeFinalEstimateScrumMember',
    'pokerShoreApp.version'
    ]);

    pokerShoreApp.value('$', $);

    pokerShoreApp.service('signalRSvc', ['$', '$rootScope', '$timeout', function ($, $rootScope, $timeout) {
        var self = this;
        self.proxy = null;
        self.roomId = "";
        self.started = false;

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
            SET_FINAL_ESTIMATE: 'setFinalEstimate',
            GET_FINAL_ESTIMATE: 'getFinalEstimate',
            ABORT_VOTING: 'abortVoting'
        };

        var initialize = function () {
            //Getting the connection object
            var connection = $.hubConnection(location.protocol + "//" + location.host + "/signalr", { useDefaultPath: false });
            connection.logging = false;
            //Creating proxy
            self.proxy = connection.createHubProxy('scrumPokerHub');

            //Reconnect on timeout
            connection.disconnected(function () {
                console.log("Connection timed out...");
                setTimeout(function () {
                    connection.start();
                    self.proxy.invoke('reconnectEvent', sessionStorage.roomId, sessionStorage.userName, sessionStorage.isScrumMaster);
                }, 5000); // Restart connection after 5 seconds.
            });

            var createProxyListener = function (proxyObj, proxyID) {
                proxyObj.on(proxyID, function (obj) {
                    if (proxyID === "roomCreated") {
                        setRoomId(obj);
                    }
                    PubSub.publish(proxyID, obj);
                    PubSub.publish(proxyID, obj);
                });
            };

            var onProxyVarsArray = ['roomCreated', 'roomJoined', 'getParticipants', 'getPBIS', 'PBIPushed', 'PBIUpdated', 'addedEstimation', 'getUserEstimates', 'showEstimates', 'finalEstimateSet', 'votingAborted'];

            for (var i = 0; i < onProxyVarsArray.length; i++) {
                createProxyListener(self.proxy, onProxyVarsArray[i]);
            }

            //Starting connection
            connection.start().done(function () {
                self.started = true;
                console.log("Connection established. Connect id: " + connection.id);
                if (sessionStorage.roomId !== 'undefined' && sessionStorage.userName !== 'undefined' && sessionStorage.isScrumMaster !== 'undefined') {
                    self.proxy.invoke('reconnectEvent', sessionStorage.roomId, sessionStorage.userName, sessionStorage.isScrumMaster);
                }
            }).fail(function (e) {
                console.log(e);
                console.log("Connection Failed.");
            });
        };

        var sendRequest = function (reqName, obj) {
            if (self.started) {
                self.proxy.invoke(reqName, obj);
            }
        };

        var sendRequestWithRoomID = function (reqName, obj) {
            if (self.started) {
                if (obj) {
                    self.proxy.invoke(reqName, self.roomId, obj);
                } else {
                    self.proxy.invoke(reqName, self.roomId);
                }
            }
        };


        var getRoomId = function() {
            return self.roomId;
        };

        var setRoomId = function(id) {
            self.roomId = id;
        };

        var setSessionStorage = function (roomId, name, isScrumMaster) {
            sessionStorage.roomId = roomId;
            sessionStorage.userName = name;
            sessionStorage.isScrumMaster = isScrumMaster;
        };

        return {
            initialize: initialize,
            CONST : CONST,
            sendRequest: sendRequest,
            sendRequestWithRoomID : sendRequestWithRoomID,
            getRoomId : getRoomId,
            setRoomId : setRoomId,
            setSessionStorage : setSessionStorage
        };
    }]);

    pokerShoreApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);

    pokerShoreApp.controller('mainController', ['$scope', 'signalRSvc', '$timeout', '$location', '$route', function ($scope, signalRSvc, $timeout, $location, $route) {
        signalRSvc.initialize();
        $scope.date = new Date();

        PubSub.subscribe('roomJoined', function (msg, success) {
            if (success) {
                signalRSvc.setRoomId(sessionStorage.roomId);
                signalRSvc.setSessionStorage(sessionStorage.roomId, sessionStorage.userName, sessionStorage.isScrumMaster);
                $route.reload();
            } else {
                $location.path('/home');
            }
            $timeout(function () {
                $scope.$apply();
            }, 0);
        });
    }]);
})();
