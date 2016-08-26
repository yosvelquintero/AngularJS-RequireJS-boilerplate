define(['./module'], function(directives) {
  'use strict';

  directives.directive('showErrors', ['$timeout', '$interpolate', function($timeout, $interpolate) {
    var linkFn = function(scope, el, attrs, formControler) {
      var inputEl, inputName, inputNgEl, showSuccess, toggleClasses,
        initCheck = false,
        showValidationMessages = false,
        // blurred = true;
        options = scope.$eval(attrs.showErrors) || {};

      showSuccess = options.showSuccess || false;
      inputEl = el[0].querySelector('.form-control[name]') || el[0].querySelector('[name]');
      inputNgEl = angular.element(inputEl);
      inputName = $interpolate(inputNgEl.attr('name') || '')(scope);

      if (!inputName) {
        throw 'show-errors element has no child input elements with a \'name\' attribute class';
      }

      var reset = function() {
        return $timeout(function() {
          el.removeClass('has-error');
          el.removeClass('has-success');
          showValidationMessages = false;
        }, 0, false);
      };

      scope.$watch(function() {
        return formControler[inputName] && formControler[inputName].$invalid;
      }, function(invalid) {
        return toggleClasses(invalid);
      });

      scope.$on('show-errors-check-validity', function(event, name) {
        if (angular.isUndefined(name) || formControler.$name === name) {
          initCheck = true;
          showValidationMessages = true;

          return toggleClasses(formControler[inputName].$invalid);
        }
      });

      scope.$on('show-errors-reset', function(event, name) {
        if (angular.isUndefined(name) || formControler.$name === name) {
          return reset();
        }
      });

      toggleClasses = function(invalid) {
        el.toggleClass('has-error', showValidationMessages && invalid);
        if (showSuccess) {
          return el.toggleClass('has-success', showValidationMessages && !invalid);
        }
      };
    };

    return {
      restrict: 'A',
      require: '^form',
      compile: function(elem, attrs) {
        if (attrs.showErrors.indexOf('skipFormGroupCheck') === -1) {
          if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
            throw 'show-errors element does not have the \'form-group\' or \'input-group\' class';
          }
        }
        return linkFn;
      }
    };
  }]);
});