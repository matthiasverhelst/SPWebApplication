'use strict';

(function () {
  angular.module('pokerShoreApp.createRoom', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/create_room', {
      templateUrl: 'views/create_room/create_room.html',
      controller: 'CreateRoomCtrl'
    });
  }])

  .controller('CreateRoomCtrl', ['$scope', '$http', function($scope, $http) {
      $scope.listOfRooms = [];
      $scope.addRoom = function(){
          console.log("addRoom called");

          if(!$scope.roomInput || $scope.roomInput === '') { return; }

          $scope.listOfRooms.push({roomName: $scope.roomInput, roomOwner: "Scrum Master"});
          $scope.roomInput='';
      };

      $scope.validateEmail = function(){
          var patt = new RegExp("[a-zA-Z0-9]+\@[a-zA-Z0-9]+(.[a-zA-Z0-9]+)+");
          var res = patt.test($scope.email);

          if (res == false) {
              //window.alert("Invalid e-mail address ('" + $scope.email + "'). Please, correct it.");
              $scope.emailIncorrect = true;
          }

          else {
              $scope.emailIncorrect = false;
              $scope.addRoom();
          }
          return res;
      };
  }]);
})();
