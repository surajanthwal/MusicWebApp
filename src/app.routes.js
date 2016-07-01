
angular
    .module('app.routes', ['ui.router'])
    .config(config)
    .run(function($state) {
    $state.go('allSongs'); //make a transition to songs state when app starts
});

function config ($stateProvider) {
    $stateProvider.
        state('allSongs',{
            url:'/songs',
            params:{
            currentPage:null,
            },
            templateUrl:'allSongs.html',
            controller:'SongsCtrl as songs',
           
        }).state('oneSong',{
                    url:'/editSong/:songId',
                    params:{
                            song: null,
                            currentPage:'1',
                            },
                    templateUrl:'songEdit.html',
                    controller:'SongCtrl as song'
        }).state('allGenres',{
                    url:'/genres',
                    params:{
                    currentPage:null,
                    },
                    templateUrl:'allGenres.html',
                    controller:'GenresCtrl as genres'
        }).state('oneGenre',{
                    url:'/editGenre/:genreId',
                    params:{
                            genre: null,
                            currentPage:'1',
                            },
                    templateUrl:'genreEdit.html',
                    controller:'GenreCtrl as genre'
        });
}