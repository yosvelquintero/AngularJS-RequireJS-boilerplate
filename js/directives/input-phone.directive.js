define(['./module'], function(directives) {
  'use strict';

  directives.directive('inputPhone', ['$filter', '$browser', function($filter, $browser) {
    return {
      require: 'ngModel',
      link: function(scope, elem, $attrs, ngModelCtrl) {
        var listener = function() {
          var value = elem.val().replace(/[^0-9]/g, '');
          elem.val($filter('tel')(value, false));
        };

        ngModelCtrl.$parsers.push(function(viewValue) {
          return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
        });

        ngModelCtrl.$render = function() {
          elem.val($filter('tel')(ngModelCtrl.$viewValue, false));
        };

        elem.bind('change', listener);
        elem.bind('keydown', function(event) {
          var key = event.keyCode;
          if (key === 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
            return;
          }
          $browser.defer(listener);
        });

        elem.bind('paste cut', function() {
          $browser.defer(listener);
        });
      }
    };
  }]);
});