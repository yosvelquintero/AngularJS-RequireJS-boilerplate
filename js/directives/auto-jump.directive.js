function getCaretPosition(elem) {
  if (document?.selection?.createRange) {
    const range = document.selection.createRange();
    const bookmark = range.getBookmark();
    return bookmark.charCodeAt(2) - 2;
  }

  return elem.setSelectionRange ? elem.selectionStart : undefined;
}

function handleInputKeydown(e) {
  const code = e.which || e.keyCode;
  const elem = e.target;
  const tabindex = parseInt(elem.getAttribute('tabindex'));
  const maxlength = parseInt(elem.getAttribute('maxlength'));
  const cp = getCaretPosition(elem);

  if (elem.value.length === maxlength && ![8, 37, 38, 39, 40, 46].includes(code)) {
    const next = document.querySelector('#input' + (tabindex + 1));
    next?.focus();
  } else if ((cp === 0 && code === 46) || (cp === 1 && code === 8)) {
    e.preventDefault();
    const val = elem.value;
    const prev = document.querySelector('#input' + (tabindex - 1));
    elem.value = val.substring(1);
    prev?.focus();
  }
}

define(['./module'], function (directives) {
  'use strict';

  directives.directive('autoJump', [
    function () {
      return {
        restrict: 'A',
        link: function (scope, elem, attr) {
          elem.on('input keydown', handleInputKeydown);
        },
      };
    },
  ]);
});
