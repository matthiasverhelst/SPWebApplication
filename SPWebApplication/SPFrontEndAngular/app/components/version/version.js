'use strict';

angular.module('pokerShoreApp.version', [
  'pokerShoreApp.version.interpolate-filter',
  'pokerShoreApp.version.version-directive'
])

.value('version', '0.1');
