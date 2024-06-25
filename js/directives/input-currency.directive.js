function getCaretPosition(input) {
  return input ? (input.selectionStart !== undefined ? input.selectionStart : getCaretPositionLegacy(input)) : 0;
}

function getCaretPositionLegacy(input) {
  input.focus();
  const selection = document.selection.createRange();
  selection.moveStart('character', input.value ? -input.value.length : 0);
  return selection.text.length;
}

function setCaretPosition(input, pos) {
  if (!input || input.offsetWidth === 0 || input.offsetHeight === 0) {
    return;
  }
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(pos, pos);
  } else {
    setCaretPositionLegacy(input, pos);
  }
}

function setCaretPositionLegacy(input, pos) {
  const range = input.createTextRange();
  range.collapse(true);
  range.moveEnd('character', pos);
  range.moveStart('character', pos);
  range.select();
}

function toNumber(currencyStr) {
  return parseFloat(currencyStr.replace(toNumberRegex, ''), 10);
}

define(['./module'], function (directives) {
  'use strict';

  directives.directive('inputCurrency', [
    '$filter',
    '$locale',
    function ($filter, $locale) {
      const decimalSep = $locale.NUMBER_FORMATS.DECIMAL_SEP;
      const toNumberRegex = new RegExp('[^0-9\\' + decimalSep + ']', 'g');

      function filterCurrency(value) {
        return $filter('currency')(value);
      }

      return {
        restrict: 'A',
        require: 'ngModel',
        link: function postLink(scope, elem, attrs, modelCtrl) {
          modelCtrl.$formatters.push(filterCurrency);
          modelCtrl.$parsers.push(function (newViewValue) {
            const oldModelValue = modelCtrl.$modelValue;
            const newModelValue = toNumber(newViewValue);
            const viewValue = filterCurrency(newModelValue);
            modelCtrl.$viewValue = viewValue;
            const pos = getCaretPosition(elem[0]);
            elem.val(viewValue);
            let newPos = pos + viewValue.length - newViewValue.length;
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
