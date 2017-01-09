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

    pokerShoreApp.service('signalRSvc', ['$', '$rootScope', '$timeout', '$location', function ($, $rootScope, $timeout, $location) {
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
            ABORT_VOTING: 'abortVoting',
            REMOVE_USER: 'removeUser'
        };

        var onProxyVarsArray = ['roomCreated', 'roomJoined', 'getParticipants', 'getPBIS', 'PBIPushed', 'PBIUpdated', 'addedEstimation', 'getUserEstimates', 'showEstimates', 'finalEstimateSet', 'votingAborted'];

        var initialize = function () {
            //Getting the connection object
            var connection = $.hubConnection(location.protocol + "//" + location.host + "/signalr", { useDefaultPath: false });
            connection.logging = false;
            //Creating proxy
            self.proxy = connection.createHubProxy('scrumPokerHub');

            //Reconnect on timeout
            connection.disconnected(function () {
                console.log("Connection timed out...");
                PubSub.publish('disconnected');
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

            for (var i = 0; i < onProxyVarsArray.length; i++) {
                createProxyListener(self.proxy, onProxyVarsArray[i]);
            }

            //Starting connection
            connection.start().done(function () {
                self.started = true;
                console.log("Connection established. Connect id: " + connection.id);
                if (sessionStorage.roomId !== 'undefined' && sessionStorage.userName !== 'undefined' && sessionStorage.isScrumMaster !== 'undefined') {
                    self.proxy.invoke('reconnectEvent', sessionStorage.roomId, sessionStorage.userName, sessionStorage.isScrumMaster);
                } else {
                    $location.path('/home');
                    $timeout(function () {
                        $rootScope.$apply();
                    }, 0);
                }
            }).fail(function (e) {
                console.log(e);
                console.log("Connection Failed.");
            });
        };

        var sendRequest = function (reqName, obj) {
            if (self.started) {
                if (obj) {
                    self.proxy.invoke(reqName, obj);
                } else {
                    self.proxy.invoke(reqName);
                }
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
            CONST: CONST,
            subscribeEvents: onProxyVarsArray,
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

    pokerShoreApp.controller('mainController', ['$scope', 'signalRSvc', '$timeout', '$location', '$route','$sce', function ($scope, signalRSvc, $timeout, $location, $route, $sce) {
        signalRSvc.initialize();
        $scope.date = new Date();
        $scope.dialog = {};
        $scope.dialog.show = false;
        $scope.dialog.disconnected = {};
        $scope.dialog.disconnected.title = "Time out";
        $scope.dialog.disconnected.text = "Your connection has been timed out, what would you like to do?";
        $scope.dialog.about = {};
        $scope.dialog.about.title = "About";
        $scope.dialog.about.text = "The Pokershore app can be used to facilitate the estimation of a PBI during the Sprint planning, especially with an offshore team. When opening the app, the user needs to specify whether (s)he is the Scrum Master or a Scrum Member. If Scrum Master, a room with a unique room ID can be created. If Scrum Member, a nickname must be given and (s)he needs to enter the room ID to participate. The Scrum Master can track the members entering the room. Unless a PBI is pushed, the Scrum Members see a waiting screen. Next the Master pushes a PBI to start voting. The Fibonacci sequence is shown. The Scrum Master has 2 extra buttons on the voting screen: skip and abort. After voting both Scrum Member and Master go to the overview screen. When the Scrum Master chooses to show votes, all votes are shown to the team. Then the Scrum Member chooses to revote (which initiates the voting process again) or (s)he can choose a final estimate. This final estimate is then shown to all participants. The entire process can start again when the Scrum Master pushes the next PBI.";
        $scope.dialog.help = {};
        $scope.dialog.help.title = "Help";
        $scope.dialog.help.text = "<b>- How can I reach the PokerShore App?<br /></b> The app can be used on any device with internet connection, such as PC, tablet or smartphone. Just go to http://www.tiny.cc/pokershore. No login is required.<br /><br /><b>- Can the tool be used by people not working at Capgemini?</b><br />The application is accesible for everybody with internet connection. No log-in or other authentication is needed.<br /><br /> <b>- On which devices can the tool be used?</b><br />The app can be used on any device with internet connection, such as PC, tablet or smartphone. The application can be used via any browser. We advise you to use Google Chrome as browser.<br /><br /><b>- What is the cost to use the PokerShore tool?</b><br />PokerShore is free to use.<br /><br /><b>- How much people can join the same room?</b><br />The PokerShore app is developed to support up to 20 team members in the same room.<br /><br /><b>- Can I still join a room in which voting has already started?</b><br />Yes, you can access the room by entering the room ID. You can join the voting as soon as the Scrum Master pushes the next PBI.<br /><br /><b>- How secure is the data entered into the tool?</b><br />No data is saved into a database. So all data is deleted when the scrum master leaves the room. If you have any concerns about the confidentiality of your data, you can use ID's or short titles for your PBI's. In that way, other people will never see the context of the data if they would capture it in any way.<br /><br /><b>- What should I do if I have any problem or suggestion?</b><br />All extra feedback is welcome. Please send an e-mail to codingnights.bnl@capgemini.com We will contact you as soon as possible."
        $scope.dialog.buttons = {};

        $scope.dialog.reconnect = function () {
            $scope.dialog.show = false;
            $scope.dialog.buttons.show = false;
            signalRSvc.initialize();
        };

        $scope.dialog.toHome = function () {
            $scope.dialog.show = false;
            $scope.dialog.buttons.show = false;
            sessionStorage.clear();
            for (var i = 0; i < signalRSvc.subscribeEvents.length; i++) {
                PubSub.unsubscribe(signalRSvc.subscribeEvents[i]);
            }
            PubSub.unsubscribe('disconnected');
            $location.path('/home');
            signalRSvc.initialize();
        };

        $scope.dialog.closeModal = function () {
            $scope.dialog.show = false;
            $scope.dialog.buttons.show = false;
        };

        $scope.dialog.showAbout = function () {
            $scope.dialog.title = $scope.dialog.about.title;
            $scope.dialog.text = $sce.trustAsHtml($scope.dialog.about.text);
            $scope.dialog.show = true;
        };

        $scope.dialog.showHelp = function () {
            $scope.dialog.title = $scope.dialog.help.title;
            $scope.dialog.text = $sce.trustAsHtml($scope.dialog.help.text);
            $scope.dialog.show = true;
        };

        $scope.dialog.showDisconnected = function () {
            $scope.dialog.title = $scope.dialog.disconnected.title;
            $scope.dialog.text = $sce.trustAsHtml($scope.dialog.disconnected.text);
            $scope.dialog.show = true;
            $scope.dialog.buttons.show = true;
            $timeout(function () {
                $scope.$apply();
            }, 0);
        };

        $scope.toHome = function () {
            sessionStorage.clear();
            signalRSvc.sendRequest(signalRSvc.CONST.REMOVE_USER);
            for (var i = 0; i < signalRSvc.subscribeEvents.length; i++) {
                PubSub.unsubscribe(signalRSvc.subscribeEvents[i]);
            }
            $location.path('/home');
        }

        PubSub.subscribe('roomJoined', function (msg, roomJoinedDTO) {
            if (roomJoinedDTO.Success) {
                signalRSvc.setRoomId(sessionStorage.roomId);
                signalRSvc.setSessionStorage(roomJoinedDTO.RoomId, roomJoinedDTO.UserName, roomJoinedDTO.IsScrumMaster);
                $route.reload();
            } else {
                $location.path('/home');
            }
            $timeout(function () {
                $scope.$apply();
            }, 0);
        });

        PubSub.subscribe('disconnected', $scope.dialog.showDisconnected);
    }]);
})();
