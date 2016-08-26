define(['./module'], function(controllers) {
  'use strict';

  controllers.controller('PersonGenerateDemoDataController', ['PersonService',
    function(PersonService) {
      var vm = this;

      vm.generateDemoData = function() {
        return PersonService.generateDemoData();
      };
    }
  ]);
});