'use strict';


PackagesController.$inject = [
  '$rootScope',
  '$stateParams',
  'cfpLoadingBar',
  'app.services.packages',
  'app.services.gulp',
  'app.services.jspm',
  'app.services.grunt',
  'app.services.yeoman'
];
export function PackagesController($rootScope, $stateParams, cfpLoadingBar, Packages, Gulp, JSPM, Grunt, Yeoman) {
  this.packageGroup = Packages.getPackageGroup($stateParams.group);
  this.packages = [];
  this.maxItems = 25;
  this.pageSize = 25;
  this.busy = false;

  $rootScope.currentSection = {title: this.packageGroup.title};
  $rootScope.currentTheme = $stateParams.group;
  $rootScope.searchFilter = '';

  let services = {
    grunt: Grunt,
    gulp: Gulp,
    yeoman: Yeoman,
    jspm: JSPM
  };

  this.nextItems = () => {
    this.busy = true;
    if (this.packages.length === 0) {
      cfpLoadingBar.start();
      return services[this.packageGroup.name].search()
        .then(({results}) => {
          this.packages = results;
        })
        .finally(() => {
          this.busy = false;
          $rootScope.currentSection = {
            title: `${this.packageGroup.title}`,
            subtitle: `${this.packages.length}`
          };
          cfpLoadingBar.complete();
        });
    }
    else {
      this.maxItems += this.pageSize;
    }
  };
}
