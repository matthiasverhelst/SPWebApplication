'use strict';

describe('myApp.view2 module', function() {

  beforeEach(module('myApp.view2'));

  describe('view2 controller', function(){

    it('should add and remove a PBI ', inject(function($controller) {
      //spec body
        var scope = {}, view2Ctrl = $controller('View2Ctrl', { $scope: scope });
        var originalArraySize = scope.pbiArray.length;
        scope.createPbi("Test");
        scope.removePbi(0);
        expect(scope.pbiArray.length).toBe(originalArraySize);
    }));


    it('should not add a non empty PBI', inject(function ($controller) {
        //spec body
        var scope = {}, view2Ctrl = $controller('View2Ctrl', { $scope: scope });
        scope.createPbi("");
        expect(scope.pbiArray.length).toBe(0);
    }));

    it('should change name of a PBI', inject(function ($controller) {
        //spec body
        var scope = {}, view2Ctrl = $controller('View2Ctrl', { $scope: scope });
        scope.createPbi("TEST");
        scope.changeName(0, "TEST2");
        expect(scope.pbiArray[0].PBI_Name).toEqual("TEST2");
    }));

    //it('should remove a pbi to the array', inject(function ($controller) {
    //    //spec body
    //    var scope = {}, view2ctrl = $controller('view2ctrl', { $scope: scope });
        
    //    expect(scope.pbiarray.length).tobe(originalarraysize-1);
    //}));

  });
});