define(['./module'], function (filters) {
  'use strict';

  return filters.filter('words', [
    function () {
      return function (input, words) {
        if (isNaN(words)) return input;
        if (words <= 0) return '';
        if (input) {
          const inputWords = input.split(/\s+/);
          if (inputWords.length > words) {
            input = inputWords.slice(0, words).join(' ') + '…';
          }
        }
        return input;
      };
    },
  ]);
});
