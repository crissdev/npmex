'use strict';

import {registerRoutes} from './app.routes.js';


configure.$inject = [
  '$urlRouterProvider',
  '$stateProvider',
  '$mdThemingProvider',
  '$compileProvider',
  'cfpLoadingBarProvider'
];
export function configure($urlRouterProvider, $stateProvider, $mdThemingProvider, $compileProvider, cfpLoadingBarProvider) {
  // red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green,
  // light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
  $compileProvider.debugInfoEnabled(true);

  cfpLoadingBarProvider.includeSpinner = false;

  $mdThemingProvider.theme('npmex', 'default');
  $mdThemingProvider.theme('gulp', 'npmex').primaryPalette('red');
  $mdThemingProvider.theme('grunt', 'npmex').primaryPalette('brown');
  $mdThemingProvider.theme('jspm', 'npmex').primaryPalette('deep-orange');
  $mdThemingProvider.theme('yeoman', 'npmex').primaryPalette('teal');

  registerRoutes($urlRouterProvider, $stateProvider);
}
