'use strict';

angular
  .module('app.services', ['ngResource'])
  .factory('TrackService', ['$resource', dataService])
  .factory('GenreService', ['$resource', dataGenre]);

function dataGenre($resource) {
  return $resource('http://104.197.128.152:8000/v1/genres/:genreId', {
    genreId: '@id'
  });
}



function dataService($resource) {
  return $resource('http://104.197.128.152:8000/v1/tracks/:itemId', {
    itemId: '@id'
  }, {
    update: {
      method: 'POST'
    }
  });
}