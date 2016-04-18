'use strict';

(function () {
  angular.module('pokerShoreApp.waitingRoomScrumMaster', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/waitingRoomScrumMaster/:param1', {
      templateUrl: 'views/scrumMaster/waitingRoom/waitingRoom.html',
      controller: 'waitingRoomScrumMasterCtrl'
    });
  }])

  .controller('waitingRoomScrumMasterCtrl', ['$scope','$routeParams', '$http','$timeout','signalRSvc', function($scope, $routeParams, $http, $timeout,signalRSvc) {
      var roomId = $routeParams;
      $scope.roomNum = roomId.param1;
      $scope.participantsList = [];
      $scope.createPbi = function (newPbi) {
          console.log("createPbi");
          if (newPbi && newPbi.length >= 1) {
              var Pbi = {
                  "PBI_name": newPbi,
                  "PBI_score": ""
              };
              $scope.pbiArray.push(Pbi);
              if ($scope.setPbiFocus) {
                  focusNewPbi();
              }
          }
      };

      var focusNewPbi = function () {
          console.log("focus");
          document.getElementById("newPbi").focus();
          $scope.setPbiFocus = false;
      }

      $scope.submit = function () {
          console.log("submit");
          document.activeElement.blur();
          //document.getElementById("newPbi").blur();
          focusNewPbi();
      };


      $scope.removePbi = function (index) {
          $scope.pbiArray.splice(index, 1);
      };

      $scope.pbiArray = [];



      PubSub.subscribe( 'participantsListChanged', function(msg, participantsList){
          $scope.participantsList = participantsList;
          $timeout(function(){
              $scope.$apply();
          },0);
      });

      signalRSvc.getParticipants($scope.roomNum);
  }]);
})();
