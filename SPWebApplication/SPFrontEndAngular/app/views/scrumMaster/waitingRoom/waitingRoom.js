'use strict';

(function () {
  angular.module('pokerShoreApp.waitingRoomScrumMaster', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/waitingRoomScrumMaster/:param1', {
      templateUrl: 'views/scrumMaster/waitingRoom/waitingRoom.html',
      controller: 'waitingRoomScrumMasterCtrl'
    });
  }])

  .controller('waitingRoomScrumMasterCtrl', ['$scope','$routeParams', '$http','$timeout','signalRSvc','$location', function($scope, $routeParams, $http, $timeout,signalRSvc,$location) {
      var roomId = $routeParams;
      $scope.roomNum = roomId.param1;
      $scope.participantsList = [];
      $scope.createPbi = function (newPbi) {
          if (newPbi && newPbi.length >= 1) {
              var Pbi = {
                  "PBI_name": newPbi,
                  "PBI_score": ""
              };
            signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.REMOVE_PBI, Pbi.PBI_name);

              $scope.pbiArray.push(Pbi);
              if ($scope.setPbiFocus) {
                  focusNewPbi();
              }
          }
      };

      var focusNewPbi = function () {
          document.getElementById("newPbi").focus();
          $scope.setPbiFocus = false;
      };

      $scope.submit = function () {
          document.activeElement.blur();
          //document.getElementById("newPbi").blur();
          focusNewPbi();
      };

      $scope.removePbi = function (index) {
          signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.REMOVE_PBI, $scope.pbiArray[index].PBI_name);
          $scope.pbiArray.splice(index, 1);
      };

      $scope.pbiArray = [];

      $scope.goToVoting = function(){
          $location.path("/votingScrumMaster");

      };

      PubSub.subscribe( 'getPBIS', function(msg, pbiArray){
          console.log(pbiArray);
      });

      PubSub.subscribe('getParticipants', function(msg, participantsList){
          $scope.participantsList = participantsList;
          $timeout(function(){
              $scope.$apply();
          },0);
      });

      signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.GET_PARTICIPANTS);
      signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.GET_PBIS);
  }]);
})();
