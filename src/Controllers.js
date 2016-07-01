'use strict';
angular.module('app.controllers',['ngAnimate', 'ui.bootstrap','ui.select', 'ngSanitize','ui.router'])
    .controller('SongsCtrl',['TrackService','GenreService','$location','$state','$stateParams',function(TrackService,GenreService,$location,$state,$stateParams){

    var vm=this;
        vm.allTracks=[];
            vm.pageBefore=0;
            vm.pageNext=1;
            
  // if ($stateParams.currentPage) {vm.bigCurrentPage=$stateParams.currentPage;
  //      console.log('currentPage inside songsctrl ',vm.bigCurrentPage);
  // }else{vm.bigCurrentPage=1;
  //   console.log('else part');}
       
  
    // vm.pageChanged = function() {

    // console.log('Page changed to: ' + vm.bigCurrentPage);
    
    // };

   //  vm.callme=function(song){
  	// console.log(song);
   //  $location.path('/editSong/'+song.id);
   //  }

    
    
   
    TrackService.get(function(response){
      vm.allTracks=response.results;
      vm.bigTotalItems=vm.allTracks.length;
      console.log('inside controller'+vm.allTracks);

    });

    vm.searchSong=function(){
      TrackService.get({title:vm.searchText},function(response){
           // console.log(vm.searchText);
           // console.log(response);
      if(response.results.length){vm.allTracks=response.results;}
      });
             
    }
    vm.homeScreen=function(){TrackService.get(function(response){
      vm.allTracks=response.results;
      vm.bigTotalItems=vm.allTracks.length;
    console.log('home homeScreen');

    });

    }

            vm.previousPage=function(){
                     
                    vm.pageBefore--;
                 if(vm.pageBefore>0){
                    TrackService.get({page:vm.pageBefore},function(response){
                       vm.allTracks=response.results;
                       vm.bigTotalItems=vm.allTracks.length;
                       // console.log('inside controller'+vm.allTracks);

                    });
                  }
           }

           vm.nextPage=function(){
                     
                       vm.pageNext++;
                       TrackService.get({page:vm.pageNext},function(response){
                       
                       if(!response.results){
                        vm.pageNext--;
                        // vm.bigTotalItems=vm.allTracks.length;
                       // console.log('inside controller'+vm.allTracks);
                       }else{
                        
                        vm.allTracks=response.results;
                        vm.pageBefore=vm.pageNext;
                       }
                    });
                        // vm.pageBefore=vm.pageNext;

           }
// TrackService.query(function(response) {
//            vm.allTracks=response;
//            vm.bigTotalItems=vm.allTracks.length;
//            console.log(vm.bigTotalItems);

//          console.log('inside controller');

//           });    
}])

    .controller('SongCtrl',['TrackService','GenreService','$location','$state','$stateParams',function(TrackService,GenreService,$location,$state,$stateParams){

           var vm=this;
           vm.track=$stateParams.song;
           vm.genres=[];          
            vm.currentPage=$stateParams.currentPage;
            // console.log('Inside song ctrl ',vm.currentPage);
            // angular.forEach(vm.track.genres, function(value, key) {
            //    vm.genreName.push(vm.track.genres[key].name);
            //  });
           var pageNo="1";

            
            var fetchGenres=function(){   
              GenreService.get({page:pageNo},function(response){
                 console.log(response);
                 if(response.results){
                     vm.genres=vm.genres.concat(response.results);     
                     console.log(vm.genres);
                     pageNo++;
                  fetchGenres();
                  }
                 
              });
            }
            fetchGenres();

           vm.submit=function(){
                       vm.newGenres=[];
                       angular.forEach(vm.track.genres, function(value, key) {
                       vm.newGenres.push(value.id);
                       });

                    if($stateParams.song){
                       var track=TrackService.get({itemId:vm.track.id},function(){
                       console.log('getted track is ',track);
                       
                        track.title=vm.track.title;
                        track.genres=vm.newGenres;
                        track.rating=vm.track.rating;
                        console.log('changed track ',track);
                        track.$save();
                        });  
                    }else{
                      var newSong=new TrackService();
                       newSong.title=vm.track.title;
                       newSong.rating=vm.track.rating;
                       newSong.genres=vm.newGenres;
                       newSong.$save();

                    }
            $state.go('allSongs');               
           }

    }])

    .controller('GenresCtrl',['GenreService','$location','$state','$stateParams',function(GenreService,$location,$state,$stateParams){

    var vm=this;
        vm.allGenres=[];
        vm.pageBefore=0;
            vm.pageNext=1;
        vm.bigTotalItems=null;

  if ($stateParams.currentPage) {vm.bigCurrentPage=$stateParams.currentPage;
       console.log('currentPage inside songsctrl ',vm.bigCurrentPage);
  }else{vm.bigCurrentPage=1;
    console.log('else part');}
       
       vm.maxSize=5;
       vm.itemsPerPage=6;

    vm.pageChanged = function() {

    console.log('Page changed to: ' + vm.bigCurrentPage);
    
    };

       
    
   
    GenreService.get(function(response){
      vm.allGenres=response.results;
      vm.bigTotalItems=vm.allGenres.length;
      console.log('inside controller'+vm.allgenres);

    });

    
    vm.goBack=function(){GenreService.get(function(response){
      vm.allGenres=response.results;
      vm.bigTotalItems=vm.allGenres.length;
       vm.bigCurrentPage=1;
      });
    }

    vm.addGenre=function(){
      console.log('add genre');
    }

          vm.previousPage=function(){
                     vm.pageBefore--;
                 if(vm.pageBefore>0){
                       GenreService.get({page:vm.pageBefore},function(response){
                       vm.allGenres=response.results;
                       vm.bigTotalItems=vm.allGenres.length;
                       console.log('inside controller'+vm.allGenres);

                    });
                  }else{vm.pageBefore=0;}
          }

          vm.nextPage=function(){
                     
                      vm.pageNext++;
                       GenreService.get({page:vm.pageNext},function(response){
                       if(!response.results){
                        vm.pageNext--;
                       }else{
                        vm.bigTotalItems=vm.allGenres.length;
                        vm.allGenres=response.results;
                        vm.pageBefore=vm.pageNext;
                       }
                       console.log('inside controller'+vm.allGenres);
                    });

          }

}]).controller('GenreCtrl',['GenreService','$location','$state','$stateParams',function(GenreService,$location,$state,$stateParams){

           var vm=this;
           vm.genre=$stateParams.genre;
           vm.genres=[];          
           vm.currentPage=$stateParams.currentPage;
           console.log('$stateParams ',vm.genre);
           
           vm.submit=function(){
            
            if($stateParams.genre){
               var genre=GenreService.get({genreId:vm.genre.id},function(){
                       console.log('getted track is ',genre);        
                      genre.name=vm.genre.name;
           
                      console.log('changed genre ',genre);
                      genre.$save();
                       $state.go('allGenres'); 
                      });              
              
            } else {
                      var newGenre=new GenreService({name:vm.genre.name});
                       newGenre.$save();
                       $state.go('allGenres'); 
           
            }
          }
}]);
// TrackService.query(function(response) {
//            vm.allTracks=response;
//            vm.bigTotalItems=vm.allTracks.length;
//            console.log(vm.bigTotalItems);

//          console.log('inside controller');

//           });    

          // GenreService.query(function(response) {
          //      vm.genres=response;
          // });
             
              

             //   angular.forEach(vm.genres, function(value, key) {
             //   vm.allGenreNames.push(vm.genres[key].name);
             // });

          // console.log(vm.allGenreNames);
          

          

   


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

