define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('PersonAddController', [
    '$scope',
    '$state',
    'PersonService',
    function ($scope, $state, PersonService) {
      const vm = this;

      vm.person = {};
      vm.submitted = false;

      vm.submit = function (form) {
        vm.submitted = true;

        if (!form.$valid) {
          $scope.$broadcast('show-errors-check-validity', 'form');
          return false;
        }

        const newPerson = angular.copy(vm.person);
        PersonService.save(newPerson);

        $state.go('persons.list');
      };
    },
  ]);
});
