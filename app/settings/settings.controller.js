'use strict';

SettingsController.$inject = [
  '$rootScope',
  '$mdDialog'
];
export function SettingsController($rootScope, $mdDialog) {
  $rootScope.currentTheme = 'npmex';
  $rootScope.currentSection = {title: 'Settings'};

  this.clearCache = () => {
    window.localStorage.clear();
    $mdDialog.show($mdDialog
        .alert()
        .title('npm explorer')
        .content('Cache has been cleared.')
        .ok('Close')
    );
  };
}
