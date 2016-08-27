define(['./module'], function(directives) {
  'use strict';

  directives.directive('autoJump', [function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attr) {
        var tabindex = parseInt(attr.tabindex);
        var maxlength = parseInt(attr.maxlength);
        elem.on('input', function(e) {
          if (elem.val().length === maxlength) {
            var nextElement = document.querySelectorAll('#input' + (tabindex + 1));
            nextElement.length && nextElement[0].focus();
          }
        });
      }
    }
  }]);
});