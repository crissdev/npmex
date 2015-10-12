'use strict';

YeomanService.$inject = [
  '$http',
  '$window',
  '$q',
  'app.services.search'
];
export function YeomanService($http, $window, $q, Search) {

  const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;
  const SEARCH_KEYWORDS = ['yeoman-generator'];
  const YEOMAN_LIST_KEY = 'yeoman-list';
  const BK_LIST_KEY = 'yeoman-black-list';
  const BK_ETAG_KEY = 'yeoman-black-list-etag';

  this.search = search;
  this.blackList = blackList;


  function search() {
    var cache = JSON.parse($window.localStorage.getItem(YEOMAN_LIST_KEY));
    if (cache && cache.since + CACHE_EXPIRATION > Date.now()) {
      return $q.when(cache.data);
    }
    return $q.all([blackList(), Search.search({keywords: SEARCH_KEYWORDS, maxItems: 1})])
      .then(([bs, {total}]) => {
        return Search.search({keywords: SEARCH_KEYWORDS, maxItems: total})
          .then(response => {
            response.results = response.results.filter(item => bs.indexOf(item) < 0);
            response.total = response.results.length;

            $window.localStorage.setItem(YEOMAN_LIST_KEY, JSON.stringify({since: Date.now(), data: response}));

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
      .get('https://api.github.com/repos/yeoman/yeoman.github.io/contents/app/blacklist.json', {
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
