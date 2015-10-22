'use strict';

GruntService.$inject = [
  '$window',
  '$q',
  '$exceptionHandler',
  'app.services.search'
];
export function GruntService($window, $q, $exceptionHandler, Search) {

  const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;
  const GRUNT_LIST_KEY = 'grunt-list';
  const SEARCH_KEYWORDS = ['gruntplugin'];

  this.search = search;
  this.blackList = blackList;


  function search() {
    var cache = JSON.parse($window.localStorage.getItem(GRUNT_LIST_KEY));
    if (cache && cache.since + CACHE_EXPIRATION > Date.now()) {
      return $q.when(cache.data);
    }
    return $q.all([blackList(), Search.search({keywords: SEARCH_KEYWORDS, maxItems: 1})])
      .then(([bs, {total}]) => {
        return Search.search({keywords: SEARCH_KEYWORDS, maxItems: total})
          .then(response => {
            response.results = response.results.filter(item => !bs.hasOwnProperty(item.name));
            response.total = response.results.length;

            try {
              $window.localStorage.setItem(GRUNT_LIST_KEY, JSON.stringify({
                since: Date.now(),
                data: response
              }));
            }
            catch (err) {
              $exceptionHandler(`[grunt] Failed to persist local storage data: ${err.message}`);
            }
            return response;
          });
      });
  }

  // TODO: Any change of retrieving this from somewhere dynamically?
  function blackList() {
    // Source: https://github.com/gruntjs/gruntjs.com/blob/master/grunt-plugins.js
    // SHA: 2bedf4fc9d9c867de2fa81c63f58b38ea01b117c
    return $q.when([
      'grunt-contrib-jst-2', // Reason: unofficial contrib plugin
      'loadnpmtasks',  // Reason: not a plugin
      'dp-grunt-contrib-copy',
      'grunt-contrib-yohtml', // Reason: unofficial contrib plugin
      'grunt-contrib-quickstart', // Reason: unofficial contrib plugin
      'grunt-contrib-coffeeify', // Reason: unofficial contrib plugin
      'grunt-contrib-nodefy', // Reason: unofficial contrib plugin
      'grunt-contrib-handlebars-rhengles', // Reason: unofficial contrib plugin
      'grunt-contrib-juicepress', // Reason: unofficial contrib plugin
      'grunt-contrib-build-crx', // Reason: unofficial contrib plugin
      'grunt-test', // Reason: no real plugin
      'grunt-testingoscar123', // Reason: no real plugin
      'assemble-less-variables',
      'grunt-contrib-eslint', // Reason: unofficial contrib plugin
      'grunt-contrib-htmlone', // Reason: unofficial contrib plugin
      'grunt-contrib-coffeeify', // Reason: unofficial contrib plugin
      'grunt-contrib-compass-sourcemap', // Reason: unofficial contrib plugin
      'grunt-contrib-spritify', // Reason: unofficial contrib plugin
      'grunt-contrib-include', // Reason: unofficial contrib plugin
      'grunt-contrib-juicepress', // Reason: unofficial contrib plugin
      'grunt-contrib-hogan', // Reason: unofficial contrib plugin
      'grunt-contrib-stylus2tss', // Reason: unofficial contrib plugin, no documentation
      'grunt-contrib-smartdoc', // Reason: unofficial contrib plugin
      'grunt-contrib-cjsc', // Reason: unofficial contrib plugin
      'grunt-contrib-compressor', // Reason: unofficial contrib plugin
      'grunt-contrib-license-report', // Reason: unofficial contrib plugin
      'grunt-contrib-tishadow', // Reason: unofficial contrib plugin
      'grunt-contrib-smartsprites', // Reason: unofficial contrib plugin, no documentation
      'grunt-contrib-rubylint', // Reason: unofficial contrib plugin
      'grunt-contrib-lualint', // Reason: unofficial contrib plugin
      'grunt-contrib-levin-usemin', // Reason: unofficial contrib plugin
      'grunt-contrib-quickstart', // Reason: unofficial contrib plugin
      'grunt-contrib-i18next', // Reason: unofficial contrib plugin
      'grunt-contrib-ftpush',  // Reason: unofficial contrib plugin
      'grunt-mindirect', // Reason: duplicate of contrib-uglify
      'private-grunt-contrib-uglify', // Reason: duplicate of contrib-uglify
      'grunt-handlebars-static', // Reason: duplicate of compile-handlebars
      'grunt-contrib-jshint-reporter-tweaks', // Reason: unofficial contrib plugin
      'grunt-sass-fork', // Reason: duplicate of grunt-contrib-sass
      'grunt-gh-deploy', // Reason: duplicate of grunt-gh-pages
      'grunt-github-pages', // Reason: duplicate of grunt-gh-pages
      'grunt-contrib-cssmin-pre-2.1.0', // Reason: unofficial contrib plugin
      'private-grunt-contrib-cssmin', // Reason: unofficial contrib plugin
      'private-grunt-contrib-stylus', // Reason: unofficial contrib plugin
      'grunt-contrib-zopfli', // Reason: unofficial contrib plugin, duplicate of grunt-zopfli
      'grunt-htmlmin', // Reason: duplicate of contrib-htmlmin
      'grunt-symbolic-link', // Reason: duplicate of contrib-symlink
      'grunt-symlink', // Reason: duplicate of contrib-symlink
      'grunt-symlinks', // Reason: duplicate of contrib-symlink
      'grunt-coffee', // Reason: duplicate of contrib-coffee
      'grunt-coffee-lint', // Reason: duplicate of grunt-coffeelint, missing documentation
      'grunt-less', // Reason: duplicate of grunt-contrib-less
      'grunt-scsslint', // Reason: duplicate of grunt-scss-lint
      'grunt-css', // Reason: deprecated
      'ngbp-contrib-lintcss', // Reason: missing documentation, duplicate of grunt-contrib-csslint
      'ngbp-contrib-mincss', // Reason: missing documentation, duplicate of grunt-contrib-cssmin
      'grunt-init-test', // Reason: missing documentation, does nothing
      'grunt-contrib-githooks', // Reason: unofficial contrib plugin
      'grunt-contrib-stylus-map', // Reason: unofficial contrib plugin
      'grunt-contrib-dox', // Reason: unofficial contrib plugin
      'grunt-contrib-requiregrep', // Reason: unofficial contrib plugin
      'grunt-contrib-litchi', // Reason: unofficial contrib plugin
      'grunt-contrib-remotecordova', // Reason: unofficial contrib plugin
      'grunt-contrib-environment', // Reason: unofficial contrib plugin
      'grunt-contrib-lessify', // Reason: unofficial contrib plugin
      'grunt-contrib-appbuilder' // Reason: unofficial contrib plugin
    ]);
  }
}
