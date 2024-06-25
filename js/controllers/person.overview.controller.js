define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('PersonOverviewController', [
    function () {
      const vm = this;

      vm.dateToday = new Date();
    },
  ]);
});
