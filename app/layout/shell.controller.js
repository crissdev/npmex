'use strict';

ShellController.$inject = [
  '$rootScope',
  '$state',
  '$mdSidenav',
  'app.services.packages'
];
export function ShellController($rootScope, $state, $mdSidenav, Packages) {
  $rootScope.currentSection = {title: ''};

  this.packageGroups = Packages.getPackageGroups();
  this.navigate = navigate;
  this.openSidenav = () => $mdSidenav('primary').open();


  // region Implementation

  function navigate(stateName, params) {
    return $state.go(stateName, params)
      .then(() => $mdSidenav('primary').close());
  }

  // endregion
}
