define(['./app'], function(app) {
  'use strict';

  return app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $urlRouterProvider.when('/persons', '/persons/overview');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'templates/home/index.view.html',
          controller: 'HomeController',
          controllerAs: 'vm'
        })
        .state('fourInputs', {
          url: '/four-inputs',
          templateUrl: 'templates/four-inputs/index.view.html',
          controller: 'FourInputsController',
          controllerAs: 'vm'
        })
        .state('persons', {
          url: '/persons',
          templateUrl: 'templates/persons/index.view.html'
        })
        .state('persons.overview', {
          url: '/overview',
          templateUrl: 'templates/persons/overview.view.html',
          controller: 'PersonOverviewController',
          controllerAs: 'vm'
        })
        .state('persons.generateDemoData', {
          url: '/generate-demo-data',
          templateUrl: 'templates/persons/generate-demo-data.view.html',
          controller: 'PersonGenerateDemoDataController',
          controllerAs: 'vm'
        })
        .state('persons.list', {
          url: '/list',
          templateUrl: 'templates/persons/list.view.html',
          controller: 'PersonListController',
          controllerAs: 'vm'
        })
        .state('persons.details', {
          url: '/:id/:slug',
          templateUrl: 'templates/persons/details.view.html',
          controller: 'PersonDetailsController',
          controllerAs: 'vm'
        })
        .state('persons.add', {
          url: '/add',
          templateUrl: 'templates/persons/add.view.html',
          controller: 'PersonAddController',
          controllerAs: 'vm'
        })
        .state('autoJump', {
          url: '/auto-jump',
          templateUrl: 'templates/auto-jump/index.view.html',
          controller: 'AutoJumpController',
          controllerAs: 'vm'
        })
        .state('not-found', {
          templateUrl: 'templates/errors/not-found.view.html'
        });
    }
  ]);
});