'use strict';

PackageGroupsController.$inject = [
  '$rootScope',
  'app.services.packages'
];
export function PackageGroupsController($rootScope, Packages) {
  $rootScope.currentSection = {title: 'Package Groups'};
  $rootScope.currentTheme = 'npmex';
  this.packageGroups = Packages.getPackageGroups();
}
