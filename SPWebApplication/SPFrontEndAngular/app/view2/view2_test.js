'use strict';

describe('myApp.view2 module', function() {

  beforeEach(module('myApp.view2'));

  describe('view2 controller', function(){

    it('should add and remove a PBI to the array', inject(function($controller) {
      //spec body
        var scope = {}, view2Ctrl = $controller('View2Ctrl', { $scope: scope });
        var originalArraySize = scope.pbiArray.length;
        scope.createPbi("Test");
        scope.removePbi(0);
        expect(scope.pbiArray.length).toBe(originalArraySize);
    }));

    //it('should remove a pbi to the array', inject(function ($controller) {
    //    //spec body
    //    var scope = {}, view2ctrl = $controller('view2ctrl', { $scope: scope });
        
    //    expect(scope.pbiarray.length).tobe(originalarraysize-1);
    //}));

  });
});