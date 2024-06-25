define(['./module'], function (directives) {
  'use strict';

  directives.directive('appVersion', [
    'version',
    function (version) {
      return function (scope, elem) {
        elem.text(version);
      };
    },
  ]);
});
