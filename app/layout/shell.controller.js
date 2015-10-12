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
  this.isSameState = isSameState;
  this.openSidenav = () => $mdSidenav('primary').open();


  // region Implementation

  function navigate(stateName, groupName = '') {
    return $state.go(stateName, {group: groupName})
      .then(() => $mdSidenav('primary').close());
  }

  function isSameState(stateOrName, params, options) {
    return $state.is(stateOrName, params, options);
  }

  // endregion
}
