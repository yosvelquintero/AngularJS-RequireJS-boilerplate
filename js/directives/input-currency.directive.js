define(['./module'], function (directives) {
  'use strict';

  directives.directive('inputCurrency', [
    '$filter',
    '$locale',
    function ($filter, $locale) {
      const decimalSep = $locale.NUMBER_FORMATS.DECIMAL_SEP;
      const toNumberRegex = new RegExp('[^0-9\\' + decimalSep + ']', 'g');
      const filterFunc = function (value) {
        return $filter('currency')(value);
      };

      function getCaretPosition(input) {
        if (!input) return 0;
        if (input.selectionStart !== undefined) {
          return input.selectionStart;
        } else if (document.selection) {
          // Curse you IE
          input.focus();
          const selection = document.selection.createRange();
          selection.moveStart('character', input.value ? -input.value.length : 0);
          return selection.text.length;
        }
        return 0;
      }

      function setCaretPosition(input, pos) {
        if (!input) return 0;
        if (input.offsetWidth === 0 || input.offsetHeight === 0) {
          return; // Input's hidden
        }
        if (input.setSelectionRange) {
          input.focus();
          input.setSelectionRange(pos, pos);
        } else if (input.createTextRange) {
          // Curse you IE
          const range = input.createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }
      }

      function toNumber(currencyStr) {
        return parseFloat(currencyStr.replace(toNumberRegex, ''), 10);
      }

      return {
        restrict: 'A',
        require: 'ngModel',
        link: function postLink(scope, elem, attrs, modelCtrl) {
          modelCtrl.$formatters.push(filterFunc);
          modelCtrl.$parsers.push(function (newViewValue) {
            const oldModelValue = modelCtrl.$modelValue;
            const newModelValue = toNumber(newViewValue);
            modelCtrl.$viewValue = filterFunc(newModelValue);
            const pos = getCaretPosition(elem[0]);
            elem.val(modelCtrl.$viewValue);
            const newPos = pos + modelCtrl.$viewValue.length - newViewValue.length;
            if (oldModelValue === undefined || isNaN(oldModelValue)) {
              newPos -= 3;
            }
            setCaretPosition(elem[0], newPos);
            return newModelValue;
          });
        },
      };
    },
  ]);
});
