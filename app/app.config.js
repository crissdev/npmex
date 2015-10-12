'use strict';

import {registerRoutes} from './app.routes.js';


configure.$inject = [
  '$urlRouterProvider',
  '$stateProvider',
  '$mdThemingProvider',
  '$compileProvider'
];
export function configure($urlRouterProvider, $stateProvider, $mdThemingProvider, $compileProvider) {
  // red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green,
  // light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey

  // Set to true due to the following warning:
  //    element.scope() is not available when 'debug mode' == false.
  //    @see https://docs.angularjs.org/guide/production!
  $compileProvider.debugInfoEnabled(true);

  $mdThemingProvider.theme('npmex', 'default');
  $mdThemingProvider.theme('gulp', 'npmex').primaryPalette('red');
  $mdThemingProvider.theme('grunt', 'npmex').primaryPalette('amber');
  $mdThemingProvider.theme('jspm', 'npmex').primaryPalette('deep-orange');
  $mdThemingProvider.theme('yeoman', 'npmex').primaryPalette('teal');

  registerRoutes($urlRouterProvider, $stateProvider);
}
