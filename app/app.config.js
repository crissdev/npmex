'use strict';

import {registerRoutes} from './app.routes.js';


configure.$inject = [
  '$urlRouterProvider',
  '$stateProvider',
  '$mdThemingProvider',
  '$compileProvider',
  '$provide',
  'cfpLoadingBarProvider'
];
export function configure($urlRouterProvider, $stateProvider, $mdThemingProvider, $compileProvider, $provide, cfpLoadingBarProvider) {
  // red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green,
  // light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
  $compileProvider.debugInfoEnabled(true);

  $provide.decorator('$exceptionHandler', ['$delegate', '$injector', function($delegate, $injector) {
    return function(exception, cause) {
      $delegate(exception, cause);

      var $mdToast = $injector.get('$mdToast');
      $mdToast.show(
        $mdToast
          .simple()
          .content(exception && exception.message || 'Unknown error')
          .hideDelay(3000)
      );
    }
  }]);

  cfpLoadingBarProvider.includeSpinner = false;

  $mdThemingProvider.theme('npmex', 'default');
  $mdThemingProvider.theme('gulp', 'npmex').primaryPalette('red');
  $mdThemingProvider.theme('grunt', 'npmex').primaryPalette('brown');
  $mdThemingProvider.theme('jspm', 'npmex').primaryPalette('deep-orange');
  $mdThemingProvider.theme('yeoman', 'npmex').primaryPalette('teal');

  registerRoutes($urlRouterProvider, $stateProvider);
}
