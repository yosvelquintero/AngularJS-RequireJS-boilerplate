define(['./module'], function(directives) {
  'use strict';

  directives.directive('autoJump', [function() {
    function getCaretPosition(elem) {
      // Internet Explorer Caret Position
      if (document.selection && document.selection.createRange) {
        var range = document.selection.createRange();
        var bookmark = range.getBookmark();
        return bookmark.charCodeAt(2) - 2;
      }

      // Firefox Caret Position
      return elem.setSelectionRange && elem.selectionStart;
    }

    return {
      restrict: 'A',
      link: function(scope, elem, attr) {
        var tabindex = parseInt(attr.tabindex);
        var maxlength = parseInt(attr.maxlength);

        elem.on('input, keydown', function(e) {
          var cp, code = e.which || e.keyCode;

          if (elem.val().length === maxlength && [8, 37, 38, 39, 40, 46].indexOf(code) === -1) {
            var next = document.querySelectorAll('#input' + (tabindex + 1));
            next.length && next[0].focus();
          }

          cp = getCaretPosition(this);
          if ((cp === 0 && code === 46) || (cp === 1 && code === 8)) {
            var val = elem.val()
            var prev = document.querySelectorAll('#input' + (tabindex - 1));
            e.preventDefault();
            elem.val(val.substring(1));
            prev.length && prev[0].focus();
          }
        });
      }
    };
  }]);
});