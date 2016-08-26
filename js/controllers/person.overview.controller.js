define(['./module'], function(controllers) {
  'use strict';

  controllers.controller('PersonOverviewController', [function() {
    var vm = this;
    
    vm.dateToday = new Date();
  }]);
});