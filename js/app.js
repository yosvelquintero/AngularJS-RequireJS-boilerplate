define([
  'angular',
  'angular-ui-router',
  'angular-animate',
  'angular-messages',
  'angular-slugify',
  './controllers/index',
  './directives/index',
  './filters/index',
  './services/index',
], function (angular) {
  'use strict';

  return angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ngMessages',
    'slugifier',
    'app.controllers',
    'app.directives',
    'app.filters',
    'app.services',
  ]);
});
