'use strict';

angular
    .module('app.services',['ngResource'])
    .constant('BASE_URL', 'http://104.197.128.152:8000/v1/tracks')
    .factory('TrackService', ['$resource', dataService])
    .factory('GenreService',['$resource',dataGenre]);

function dataGenre($resource){
return $resource('http://104.197.128.152:8000/v1/genres/:genreId',{genreId:'@id'});
}



function dataService($resource) {
    return $resource('http://104.197.128.152:8000/v1/tracks/:itemId',{itemId: '@id'}, 
    {
        update: {method:'POST'}
        // titleSearch:{method:'GET',url:'http://104.197.128.152:8000/v1/tracks', isArray:true}
    });    
}
    // var data = {
    //     'getAllGenres': getAllGenres,
    //     'getSingleGenre': getSingleGenre,
    //     'editGenreRecord': editGenreRecord,
    //     'createNewGenre': createNewGenre,
    //     'listAllTracks': listAllTracks,
    //     'searchTracks': searchTracks,
    //     'getSingleTrack': getSingleTrack,
    //     'editTrack': editTrack,
    //     'createNewTrack' :createNewTrack,
    // };
    // function makeAPICall(url, params,methodType) {
    //     var requestUrl = BASE_URL + '/' + url;
    //    if(params!=null)
    //     requestUrl+='?'+params;
    //     // angular.forEach(params, function(value, key){
    //     //     requestUrl = requestUrl + '&' + key + '=' + value;
    //     // });

        
    // function getPremieres() {
    //     //Get first day of the current month
    //     var date = new Date();
    //     date.setDate(1);
    //     return makeRequest('discover/tv', {'first_air_date.gte': moment(date).format('DD-MM-YYYY'), append_to_response: 'genres'}).then(function(data){
    //         return data.results;
    //     });
    // }
    // function get(id) {
    //     return makeRequest('tv/' + id, {});
    // }
    // function getCast(id) {
    //     return makeRequest('tv/' + id + '/credits', {});
    // }
    // function search(query) {
    //     return makeRequest('search/tv', {query: query}).then(function(data){
    //         return data.results;
    //     });
    // }
    // function getPopular() {
    //     return makeRequest('tv/popular', {}).then(function(data){
    //         return data.results;
    //     });
    // }
    // return data;

    // function dataServiceError(errorResponse) {
    //     $log.error('XHR Failed for ShowService');
    //     $log.error(errorResponse);
    //     return errorResponse;
    // }
