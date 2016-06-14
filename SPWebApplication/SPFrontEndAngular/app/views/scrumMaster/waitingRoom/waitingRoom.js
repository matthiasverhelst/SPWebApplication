'use strict';

(function () {
  angular.module('pokerShoreApp.waitingRoomScrumMaster', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/waitingRoomScrumMaster/:room', {
      templateUrl: 'views/scrumMaster/waitingRoom/waitingRoom.html',
      controller: 'waitingRoomScrumMasterCtrl'
    });
  }])

  .controller('waitingRoomScrumMasterCtrl', ['$scope','$routeParams', '$http','$timeout','signalRSvc','$location', function($scope, $routeParams, $http, $timeout,signalRSvc,$location) {
      $scope.roomID = $routeParams.room;
      $scope.participantsList = [];
      $scope.pbiArray = [];

      $scope.createPbi = function (newPbi) {
          if (newPbi && newPbi.length >= 1) {
              var Pbi = {
                  "Title": newPbi,
                  "OldTitle": newPbi,
                  "FinalEstimation": ""
              };
              signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.CREATE_PBI, Pbi.Title);

              $scope.pbiArray.push(Pbi);
              if ($scope.setPbiFocus) {
                  focusNewPbi();
              }
          }
      };

      $scope.removePbi = function (index) {
          signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.REMOVE_PBI, $scope.pbiArray[index].Title);
          $scope.pbiArray.splice(index, 1);
      };

      $scope.updatePbi = function (index) {
          var updatePBIDTO = {
              "OldTitle": $scope.pbiArray[index].OldTitle,
              "NewTitle": $scope.pbiArray[index].Title
          }
          signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.UPDATE_PBI, updatePBIDTO);
          $scope.pbiArray[index].OldTitle = $scope.pbiArray[index].Title;
      }

      $scope.pushPbi = function(index){
          signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.PUSH_PBI, $scope.pbiArray[index].Title);
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

      PubSub.subscribe( 'getPBIS', function(msg, pbiArray){
          console.log("pbiArray");
          console.log(pbiArray);
          $scope.pbiArray = pbiArray;
          $timeout(function(){
              $scope.$apply();
          },0);
      });

      PubSub.subscribe('getParticipants', function(msg, participantsList){
          $scope.participantsList = participantsList;
          $timeout(function(){
              $scope.$apply();
          },0);
      });

      PubSub.subscribe('updatedPBI', function (msg, success) {
          if (!success) {
              console.log("Updating the PBI failed...");
          };
      });

      PubSub.subscribe( 'PBIPushed', function(msg, pbiName){
          var pathString = "/votingScrumMaster/" + pbiName;
          $location.path(pathString);
          console.log('PBIPushed', pbiName);
          $timeout(function(){
              $scope.$apply();
          },0);
    });

      signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.GET_PARTICIPANTS);
      signalRSvc.sendRequestWithRoomID(signalRSvc.CONST.GET_PBIS);
  }]);
})();
