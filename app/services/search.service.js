'use strict';

export function SearchProvider() {
  var defaults = {
    fields: ['name', 'keywords', 'rating', 'description', 'author', 'license', 'modified', 'homepage', 'version'],
    sort: 'rating:desc',
    maxItems: 20
  };

  Object.defineProperty(this, 'defaults', {value: defaults, writable: false, enumerable: true});

  this.$get = ['$http', function($http) {
    return {
      search
    };


    function _sortResults(results) {
      return results.sort(_sortBy(
        // Sort highly-rated plugins to top
        function (plugin) {
          return -plugin.rating;
        },
        // Fall back to sort by name
        function (plugin) {
          return plugin.name;
        }
      ));
    }

    function _sortBy() {
      var args = arguments;

      return function (a, b) {
        var scoreA, scoreB;

        for (var i = 0, len = args.length; i < len; i++) {
          scoreA = args[i](a);
          scoreB = args[i](b);
          if (scoreA < scoreB) {
            return -1;
          } else if (scoreA > scoreB) {
            return 1;
          }
        }

        return 0;
      };
    }

    function search(options) {
      options = angular.merge({}, angular.copy(defaults), options);

      let formatResponseData = function(data) {
        return {
          total: data.total,
          results: _sortResults(data.results.map((item) => {
            options.fields.forEach(field => {
              if (field !== 'keywords' && Array.isArray(item[field])) {
                item[field] = item[field][0];
              }
            });
            return item;
          }))
        }
      };

      let reqOptions = {
        transformResponse: $http.defaults.transformResponse.concat(formatResponseData),
        params: {
          fields: options.fields.join(','),
          start: ~~options.start,
          size: ~~options.maxItems,
          sort: options.sort,
          q: Array.isArray(options.keywords) ? options.keywords.map(item => `keywords:${item}`) : []
        }
      };

      return $http.get('http://npmsearch.com/query', reqOptions)
        .then(response => response.data);
    }
  }];
}
