define(['./module'], function(directives) {
  'use strict';

  directives.directive('autoJump', [function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attr, form) {
        var tabindex = +attr.tabindex + 1;
        var maxLength = +attr.ngMaxlength;
        elem.on('keypress', function(e) {
          if (elem.val().length > maxLength - 1) {
            var next;
            var inputs = angular.element(document.body).find('input');
            [].forEach.call(inputs, function(el) {
              if (tabindex == angular.element(el).attributes['tabindex']) {
                next = angular.element(el);
              }
            });
            if (next) {
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