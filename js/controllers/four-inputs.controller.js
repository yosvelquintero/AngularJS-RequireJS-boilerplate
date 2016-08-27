define(['./module'], function(controllers) {
  'use strict';

  controllers.controller('FourInputsController', [function() {
    var vm = this;

    vm.numberOne = 0;
    vm.numberTwo = 0;
    vm.numberThree = 0;
    vm.numberFour = 0;

    vm.onChangeOneOfThree = function() {
      vm.numberFour = vm.numberOne + vm.numberTwo + vm.numberThree;
    };

    vm.onChangeTheFourth = function() {
      var half = vm.numberFour / 2;
      var halfHalf = half / 2;

      vm.numberOne = half;
      vm.numberTwo = halfHalf;
      vm.numberThree = halfHalf;
    };
  }]);
});