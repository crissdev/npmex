'use strict';

import {PackagesController} from './packages/packages.controller.js';
import packagesTemplate from './packages/packages.html';

import {PackageGroupsController} from './packages/package-groups.controller.js';
import packageGroupsTemplate from './packages/package-groups.html';

import {ShellController} from './layout/shell.controller.js';
import shellTemplate from './layout/shell.html';

import {SettingsController} from './settings/settings.controller.js';
import settingsTemplate from './settings/settings.html';


export function registerRoutes($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      abstract: true,
      url: '/',
      controller: ShellController,
      controllerAs: 'shellCtrl',
      template: shellTemplate
    })
    .state('app.package-groups', {
      url: '',
      controller: PackageGroupsController,
      controllerAs: 'packageGroupsCtrl',
      template: packageGroupsTemplate
    })
    .state('app.packages', {
      url: 'packages/:group',
      controllerAs: 'packagesCtrl',
      controller: PackagesController,
      template: packagesTemplate
    })
  .state('app.settings', {
      url: 'settings',
      controllerAs: 'settingsCtrl',
      controller: SettingsController,
      template: settingsTemplate
    });
}
