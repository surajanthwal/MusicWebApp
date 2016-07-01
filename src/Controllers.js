'use strict';
angular.module('app.controllers', ['ngAnimate', 'ui.bootstrap', 'ui.select', 'ngSanitize', 'ui.router'])
  .controller('SongsCtrl', ['TrackService', 'GenreService', '$location', '$state', '$stateParams', function(TrackService, GenreService, $location, $state, $stateParams) {

    var vm = this;
    vm.allTracks = [];
    vm.pageBefore = 0;
    vm.pageNext = 1;

    TrackService.get(function(response) {
      vm.allTracks = response.results;
      vm.bigTotalItems = vm.allTracks.length;
      console.log('inside controller' + vm.allTracks);

    });

    vm.searchSong = function() {
      TrackService.get({
        title: vm.searchText
      }, function(response) {
        if (response.results.length) {
          vm.allTracks = response.results;
        }
      });

    }

    vm.homeScreen = function() {
      TrackService.get(function(response) {
        vm.allTracks = response.results;
        vm.bigTotalItems = vm.allTracks.length;
        console.log('home homeScreen');

      });

    }

    vm.previousPage = function() {

      vm.pageBefore--;
      if (vm.pageBefore > 0) {
        TrackService.get({
          page: vm.pageBefore
        }, function(response) {
          vm.allTracks = response.results;
          vm.bigTotalItems = vm.allTracks.length;

        });
      }
    }

    vm.nextPage = function() {

      vm.pageNext++;
      TrackService.get({
        page: vm.pageNext
      }, function(response) {

        if (!response.results) {
          vm.pageNext--;

        } else {
          vm.allTracks = response.results;
          vm.pageBefore = vm.pageNext;
        }
      });


    }

  }])

.controller('SongCtrl', ['TrackService', 'GenreService', '$location', '$state', '$stateParams', function(TrackService, GenreService, $location, $state, $stateParams) {

  var vm = this;
  vm.track = $stateParams.song;
  vm.genres = [];
  vm.currentPage = $stateParams.currentPage;

  var pageNo = "1";


  var fetchGenres = function() {
    GenreService.get({
      page: pageNo
    }, function(response) {
      console.log(response);
      if (response.results) {
        vm.genres = vm.genres.concat(response.results);
        console.log(vm.genres);
        pageNo++;
        fetchGenres();
      }

    });
  }
  fetchGenres();

  vm.submit = function() {
    vm.newGenres = [];
    angular.forEach(vm.track.genres, function(value, key) {
      vm.newGenres.push(value.id);
    });

    if ($stateParams.song) {
      var track = TrackService.get({
        itemId: vm.track.id
      }, function() {
        console.log('getted track is ', track);

        track.title = vm.track.title;
        track.genres = vm.newGenres;
        track.rating = vm.track.rating;
        console.log('changed track ', track);
        track.$save();
      });
    } else {
      var newSong = new TrackService();
      newSong.title = vm.track.title;
      newSong.rating = vm.track.rating;
      newSong.genres = vm.newGenres;
      newSong.$save();

    }
    $state.go('allSongs');
  }

}])

.controller('GenresCtrl', ['GenreService', '$location', '$state', '$stateParams', function(GenreService, $location, $state, $stateParams) {

  var vm = this;
  vm.allGenres = [];
  vm.pageBefore = 0;
  vm.pageNext = 1;
  vm.bigTotalItems = null;

  if ($stateParams.currentPage) {
    vm.bigCurrentPage = $stateParams.currentPage;
    console.log('currentPage inside songsctrl ', vm.bigCurrentPage);
  } else {
    vm.bigCurrentPage = 1;
    console.log('else part');
  }

  vm.maxSize = 5;
  vm.itemsPerPage = 6;

  vm.pageChanged = function() {

    console.log('Page changed to: ' + vm.bigCurrentPage);

  };

  GenreService.get(function(response) {
    vm.allGenres = response.results;
    vm.bigTotalItems = vm.allGenres.length;
    console.log('inside controller' + vm.allgenres);

  });


  vm.goBack = function() {
    GenreService.get(function(response) {
      vm.allGenres = response.results;
      vm.bigTotalItems = vm.allGenres.length;
      vm.bigCurrentPage = 1;
    });
  }

  vm.addGenre = function() {
    console.log('add genre');
  }

  vm.previousPage = function() {
    vm.pageBefore--;
    if (vm.pageBefore > 0) {
      GenreService.get({
        page: vm.pageBefore
      }, function(response) {
        vm.allGenres = response.results;
        vm.bigTotalItems = vm.allGenres.length;
        console.log('inside controller' + vm.allGenres);

      });
    } else {
      vm.pageBefore = 0;
    }
  }

  vm.nextPage = function() {

    vm.pageNext++;
    GenreService.get({
      page: vm.pageNext
    }, function(response) {
      if (!response.results) {
        vm.pageNext--;
      } else {
        vm.bigTotalItems = vm.allGenres.length;
        vm.allGenres = response.results;
        vm.pageBefore = vm.pageNext;
      }
      console.log('inside controller' + vm.allGenres);
    });

  }

}]).controller('GenreCtrl', ['GenreService', '$location', '$state', '$stateParams', function(GenreService, $location, $state, $stateParams) {

  var vm = this;
  vm.genre = $stateParams.genre;
  vm.genres = [];
  vm.currentPage = $stateParams.currentPage;
  console.log('$stateParams ', vm.genre);

  vm.submit = function() {

    if ($stateParams.genre) {
      var genre = GenreService.get({
        genreId: vm.genre.id
      }, function() {
        console.log('getted track is ', genre);
        genre.name = vm.genre.name;

        console.log('changed genre ', genre);
        genre.$save();
        $state.go('allGenres');
      });

    } else {
      var newGenre = new GenreService({
        name: vm.genre.name
      });
      newGenre.$save();
      $state.go('allGenres');

    }
  }
}]);