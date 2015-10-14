'use strict';

SettingsController.$inject = [
  '$rootScope',
  '$mdDialog',
  '$window'
];
export function SettingsController($rootScope, $mdDialog, $window) {
  $rootScope.currentTheme = 'npmex';
  $rootScope.currentSection = {title: 'Settings'};

  this.clearCache = () => {
    $window.localStorage.clear();
    $mdDialog.show($mdDialog
        .alert()
        .title('npm explorer')
        .content('Cache has been cleared.')
        .ok('Close')
    );
  };
}
