
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
            templateUrl:'allSongs.html',
            controller:'SongsCtrl as songs',
           
        }).state('oneSong',{
                    url:'/editSong/:songId',
                    params:{
                            song: null,
                            },
            templateUrl:'songEdit.html',
            controller:'SongCtrl as song'
        });
}