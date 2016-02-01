'use strict';

(function () {
  describe('pokerShoreApp.createRoom module', function() {

    beforeEach(module('pokerShoreApp.createRoom'));

    describe('createRoom controller', function(){

      it('should create a new room and open it', inject(function($controller) {
        //spec body
        var createRoomCtrl = $controller('CreateRoomCtrl');
        expect(createRoomCtrl).toBeDefined();
      }));

    });
  });
})();
