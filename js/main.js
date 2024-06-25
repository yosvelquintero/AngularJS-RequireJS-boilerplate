require.config({
  paths: {
    angular: '../node_modules/angular/angular.min',
    'angular-ui-router': '../node_modules/angular-ui-router/release/angular-ui-router.min',
    'angular-animate': '../node_modules/angular-animate/angular-animate.min',
    'angular-messages': '../node_modules/angular-messages/angular-messages.min',
    'angular-slugify': '../libs/angular-slugify/angular-slugify',
    domReady: '../node_modules/requirejs-domready/domReady',
  },
  shim: {
    angular: {
      exports: 'angular',
    },
    'angular-ui-router': {
      deps: ['angular'],
    },
    'angular-animate': {
      deps: ['angular'],
    },
    'angular-messages': {
      deps: ['angular'],
    },
    'angular-slugify': {
      deps: ['angular'],
    },
  },
  deps: ['./bootstrap'],
});
