define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('PersonListController', [
    '$state',
    'PersonService',
    function ($state, PersonService) {
      const vm = this;

      vm.personsAll = PersonService.getAll();
      vm.destroy = function (id) {
        PersonService.destroy(id);
        $state.reload();
      };
    },
  ]);
});
