'use strict';
angular.module('app.controllers',['ngAnimate', 'ui.bootstrap','ui.select', 'ngSanitize'])
    .controller('SongsCtrl',['TrackService','GenreService','$location','$stateParams',function(TrackService,GenreService,$location,$stateParams){

    var vm=this;
        vm.allTracks=null;
        vm.bigTotalItems=null;
       vm.bigCurrentPage=1;
       vm.maxSize=5;
       vm.itemsPerPage=5;



    vm.pageChanged = function() {
    console.log('Page changed to: ' + vm.bigCurrentPage);
    
    };

    vm.callme=function(song){
  	console.log(song);
    $location.path('/editSong/'+song.id);
    }

    


TrackService.query(function(response) {
           vm.allTracks=response;
           vm.bigTotalItems=vm.allTracks.length;
           console.log(vm.bigTotalItems);

         console.log('inside controller');

          });    
}])

.controller('SongCtrl',['GenreService','$location','$stateParams',function(GenreService,$location,$stateParams){

           var vm=this;
           vm.track=$stateParams.song;
           vm.genres=null;
           vm.genreName=[];
           vm.genreName=vm.track.genres;
                 vm.allGenreNames=[];
           
            // angular.forEach(vm.track.genres, function(value, key) {
            //    vm.genreName.push(vm.track.genres[key].name);
            //  });

           

          GenreService.query(function(response) {
               vm.genres=response;

               angular.forEach(vm.genres, function(value, key) {
               vm.allGenreNames.push(vm.genres[key].name);
             });

          console.log(vm.allGenreNames);
          

          });

}]);    


 // var genres=GenreService.query(function(){
	// console.log("All genres",genres);
 // });

// var singleGenre=GenreService.get({genreId:113},function(){
// 	console.log("genre id 113 is : ",singleGenre)
// singleGenre.name='tollywood';
// singleGenre.$save();
// });

// var newGenre=new GenreService({name:'Garwali'});
// newGenre.$save();

//     var allTracks=ShowService.query(function() {
//         console.log(allTracks);
//     });

 //     var singleTrack = ShowService.get({ itemId: 358 }, function(data) {
 //    console.log('Single Track get request',data);
 // });

//     var singleTrackEdit = ShowService.get({ itemId: 38 }, function() {
//     var log=[];
//     angular.forEach(singleTrackEdit.genres, function(value, key) {
//     this.push(value.id);
//     }, log);
//     singleTrackEdit.title="Hey Jude";
//     singleTrackEdit.rating='4.9';
//     singleTrackEdit.genres=[5];
//     console.log('single track edit ',singleTrackEdit);
//     singleTrackEdit.$save();
//     });

// var newSong=new ShowService({
// 	title : "Lalaa", 
// 	rating : '3.0', 
// 	genres: [7]
// });
// 	newSong.$save();
// console.log('added new song',newSong);

// var titleSearch=ShowService.get({title:'dj waley'},function (song) {
// 	console.log('dj wale babu ',song);
// });

// var titleWiseSearch=ShowService.titleSearch({title:'lalaa'}).$promise.then(function(data) {
// console.log('searched song is ',data);
// angular.forEach(data, function(value, key) {
//    data[key].$remove();
//     });
// });	
// ShowService.update({itemId:38},{"title":"hey Jude","rating":"4.9","genres":[{"id":6,"name":"tap"}]});

