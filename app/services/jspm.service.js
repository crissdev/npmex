'use strict';

JspmService.$inject = [
  '$http',
  '$q',
  '$window'
];
export function JspmService($http, $q, $window) {

  const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;
  const JSPM_ETAG_KEY = 'jspm-registry-json-etag';
  const JSOM_REGISTRY_JSON_KEY = 'jspm-registry-json-data';
  const URL_MAP = {github: 'github.com', npm: 'www.npmjs.com/package'};

  this.search = search;


  function search() {
    var cache = JSON.parse($window.localStorage.getItem(JSOM_REGISTRY_JSON_KEY));
    if (cache && cache.since + CACHE_EXPIRATION > Date.now()) {
      return $q.when(cache.data);
    }
    return $http
      .get('https://api.github.com/repos/jspm/registry/contents/registry.json', {
        headers: {
          'If-None-Match': $window.localStorage.getItem(JSPM_ETAG_KEY)
        }
      })
      .then(({data, headers}) => {
        let jsonData = atob(data.content);
        let registry = JSON.parse(jsonData);
        let response = {total: 0, results: []};

        response.results = Object.keys(registry).sort().map(name => {
          let split = registry[name].split(':');
          return {
            name: name,
            source: registry[name],
            description: registry[name],
            distro: split[0],
            rating: 0,
            homepage: `https://${URL_MAP[split[0]]}/${split[1]}`
          };
        });
        response.total = response.results.length;

        $window.localStorage.setItem(JSPM_ETAG_KEY, headers('Etag'));
        $window.localStorage.setItem(JSOM_REGISTRY_JSON_KEY, JSON.stringify({since: Date.now(), data: response}));

        return response;
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
