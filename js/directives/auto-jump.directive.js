define(['./module'], function (directives) {
  'use strict';

  directives.directive('autoJump', [
    function () {
      function getCaretPosition(elem) {
        // Internet Explorer Caret Position
        if (document?.selection?.createRange) {
          const range = document.selection.createRange();
          const bookmark = range.getBookmark();
          return bookmark.charCodeAt(2) - 2;
        }

        // Firefox Caret Position
        return elem.setSelectionRange && elem.selectionStart;
      }

      return {
        restrict: 'A',
        link: function (scope, elem, attr) {
          const tabindex = parseInt(attr.tabindex);
          const maxlength = parseInt(attr.maxlength);

          elem.on('input, keydown', function (e) {
            const code = e.which || e.keyCode;
            let cp;

            if (elem.val().length === maxlength && [8, 37, 38, 39, 40, 46].indexOf(code) === -1) {
              const next = document.querySelectorAll('#input' + (tabindex + 1));
              next.length && next[0].focus();
            }

            cp = getCaretPosition(this);
            if ((cp === 0 && code === 46) || (cp === 1 && code === 8)) {
              const val = elem.val();
              const prev = document.querySelectorAll('#input' + (tabindex - 1));
              e.preventDefault();
              elem.val(val.substring(1));
              prev.length && prev[0].focus();
            }
          });
        },
      };
    },
  ]);
});
