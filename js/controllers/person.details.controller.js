define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('PersonDetailsController', [
    '$state',
    '$stateParams',
    'PersonService',
    function ($state, $stateParams, PersonService) {
      const vm = this;

      vm.person = PersonService.getById($stateParams.id);

      if (!vm.person) {
        $state.go('not-found');
      }
    },
  ]);
});
