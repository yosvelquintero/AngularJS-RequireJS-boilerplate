const showValidationMessages = false;

const toggleClasses = function (invalid) {
  elem.toggleClass('has-error', showValidationMessages && invalid);
  if (showSuccess) {
    elem.toggleClass('has-success', showValidationMessages && !invalid);
  }
};

const reset = function () {
  return $timeout(
    function () {
      elem.removeClass('has-error');
      elem.removeClass('has-success');
      showValidationMessages = false;
    },
    0,
    false
  );
};

const watchForm = function (formControler) {
  scope.$watch(function () {
    return formControler[inputName] && formControler[inputName].$invalid;
  }, toggleClasses);
};

const handleCheckValidity = function (event, name) {
  if (angular.isUndefined(name) || formControler.$name === name) {
    showValidationMessages = true;
    toggleClasses(formControler[inputName].$invalid);
  }
};

const handleReset = function (event, name) {
  if (angular.isUndefined(name) || formControler.$name === name) {
    reset();
  }
};

define(['./module'], function (directives) {
  'use strict';

  directives.directive('showErrors', [
    '$timeout',
    '$interpolate',
    function ($timeout, $interpolate) {
      return {
        restrict: 'A',
        require: '^form',
        compile: function (elem, attrs) {
          const options = scope.$eval(attrs.showErrors) || {};
          const inputEl = elem[0].querySelector('.form-control[name]') || elem[0].querySelector('[name]');
          const inputNgEl = angular.element(inputEl);
          const inputName = $interpolate(inputNgEl.attr('name') || '')(scope);

          if (!inputName) {
            throw "show-errors element has no child input elements with a 'name' class";
          }

          if (attrs.showErrors.indexOf('skipFormGroupCheck') === -1) {
            if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
              throw "show-errors element does not have the 'form-group' or 'input-group' class";
            }
          }

          return function linkFn(scope, elem, attrs, formControler) {
            watchForm(formControler);

            scope.$on('show-errors-check-validity', handleCheckValidity);
            scope.$on('show-errors-reset', handleReset);
          };
        },
      };
    },
  ]);
});
