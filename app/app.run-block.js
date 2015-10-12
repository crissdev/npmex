'use strict';

runBlock.$inject = [
  '$rootScope', '$state', '$stateParams'
];
export function runBlock($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.currentSection = null;
  $rootScope.currentTheme = 'npmex';
  $rootScope.searchFilter = '';
}
