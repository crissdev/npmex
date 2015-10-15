'use strict';

import 'angular-material/angular-material.css!';
import 'angular-loading-bar/src/loading-bar.css!';
import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-ui-router';
import 'infinite-scroll';
import 'angular-loading-bar';


export const MODULE_NAME = 'npmex';

export function bootstrap() {
  return angular.bootstrap(window.document, [MODULE_NAME], {strictDi: true});
}


// Configuration
import {configure} from './app.config.js';

// Services
import {PackagesService} from './services/packages.service.js';
import {SearchProvider} from './services/search.service.js';
import {GulpService} from './services/gulp.service.js';
import {JspmService} from './services/jspm.service.js';
import {GruntService} from './services/grunt.service.js';
import {YeomanService} from './services/yeoman.service.js';

// Run blocks
import {runBlock} from './app.run-block.js';

// Registration
angular
  .module(MODULE_NAME, [
    'ng',
    'ngAnimate',
    'ngAria',
    'ngMaterial',

    'cfp.loadingBar',
    'infinite-scroll',
    'ui.router'
  ])
  .run(runBlock)
  .config(configure)
  .provider('app.services.search', SearchProvider)
  .service({
    'app.services.packages': PackagesService,
    'app.services.gulp': GulpService,
    'app.services.jspm': JspmService,
    'app.services.grunt': GruntService,
    'app.services.yeoman': YeomanService
  });
