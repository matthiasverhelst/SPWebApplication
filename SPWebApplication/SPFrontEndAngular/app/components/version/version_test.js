'use strict';

describe('pokerShoreApp.version module', function() {
  beforeEach(module('pokerShoreApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
