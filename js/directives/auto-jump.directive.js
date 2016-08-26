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
            var next;
            var inputs = angular
              .element(document.body)
              .find('input');
            
            angular.forEach(inputs, function(el) {
              if ((tabindex + 1) == +el.getAttribute('tabindex')) {
                next = el;
              }
            });
            
            if (next) {
              next.focus();
              return next.triggerHandler('keypress', {
                which: e.which
              });
            } else {
              return false;              
            }            
          }

          return true;
        });
      }
    }
  }]);
});
