'use strict';

var pokerShoreApp = angular.module('pokerShoreApp');

var EMAIL_REGEXPATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

pokerShoreApp.directive('emailValidator', function() {
  return {
  require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
          ctrl.$validators.email = function(modelValue, viewValue) {
              if(viewValue === null || viewValue ===""){
                  return true;
              }
              if (EMAIL_REGEXPATTERN.test(viewValue)) {
                  // it is valid
                  return true;
              }
              // it is invalid
              return false;
          };
      }
  };
});
