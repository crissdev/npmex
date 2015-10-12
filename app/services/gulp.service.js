'use strict';

GulpService.$inject = [
  '$http',
  '$window',
  '$q',
  'app.services.search'
];
export function GulpService($http, $window, $q, Search) {

  const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;
  const BK_ETAG_KEY = 'gulp-black-list-etag';
  const BK_LIST_KEY = 'gulp-black-list';
  const GULP_LIST_KEY = 'gulp-list-data';
  const SEARCH_KEYWORDS = ['gulpfriendly', 'gulpplugin'];

  this.search = search;
  this.blackList = blackList;


  function search() {
    var cache = JSON.parse($window.localStorage.getItem(GULP_LIST_KEY));
    if (cache && cache.since + CACHE_EXPIRATION > Date.now()) {
      return $q.when(cache.data);
    }
    return $q.all([blackList(), Search.search({keywords: SEARCH_KEYWORDS, maxItems: 1})])
      .then(([bs, {total}]) => {
        return Search.search({keywords: SEARCH_KEYWORDS, maxItems: total})
          .then(response => {
            response.results = response.results.filter(item => !bs.hasOwnProperty(item.name));
            response.total = response.results.length;

            $window.localStorage.setItem(GULP_LIST_KEY, JSON.stringify({since: Date.now(), data: response}));

            return response;
          });
      });
  }

  function blackList() {
    var cache = JSON.parse($window.localStorage.getItem(BK_LIST_KEY));
    if (cache && cache.since + CACHE_EXPIRATION > Date.now()) {
      return $q.when(cache.data);
    }
    return $http
      .get('https://api.github.com/repos/gulpjs/plugins/contents/src/blackList.json', {
        headers: {
          'If-None-Match': $window.localStorage.getItem(BK_ETAG_KEY)
        }
      })
      .then(response => {
        let jsonData = atob(response.data.content);
        let items = JSON.parse(jsonData);

        $window.localStorage.setItem(BK_ETAG_KEY, response.headers('Etag'));
        $window.localStorage.setItem(BK_LIST_KEY, JSON.stringify({since: Date.now(), data: items}));

        return items;
      })
      .catch(error => {
        if (error.status === 304 || error.status === 403) {
          if (cache && cache.data) {
            return $q.when(cache.data);
          }
          return $q.when([]);
        }
      });
  }
}
