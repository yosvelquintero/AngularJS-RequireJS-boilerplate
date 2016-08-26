define(['./module'], function(directives) {
  'use strict';

  directives.directive('autoJump', [function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attr, form) {
        var tabindex = parseInt(attr.tabindex);
        var maxLength = parseInt(attr.ngMaxlength);
        elem.on('keypress', function(e) {
          if (elem.val().length > maxLength - 2) {
            var next = angular
              .element(document.body)
              .find('[tabindex=' + (tabindex + 1) + ']');
            if (next.length > 0) {
              next.focus();
              return next.triggerHandler('keypress', {
                which: e.which
              });
            }
            return false;
          }
          return true;
        });
      }
    }
  }]);
});