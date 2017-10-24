var app = angular.module('myApp', ['ngRoute']);

app.service('DataService', function () {
   console.log("Data Service");

});

/*app.config(function ($routeProvider) {
  $routeProvider.

  when('/music', {
    templateUrl: 'music.html',
    controller: 'MusicController'
  }).
  otherwise({
    redirectTo: '/music'
  });
});*/

app.controller('MusicController', function($scope, $http, $location, DataService) {
    $http.get("http://localhost:8080/api/users/1/musics")
    .then(function(response) {
      
      $scope.musics = [];
      console.log("Music Controller");
  
      angular.forEach(response.data, function(item){ 
        $scope.musics.push(item);
        

        console.log(localStorage.getItem("id"))
        if(localStorage.getItem("id") != undefined)
        //if(item.id == DataService.id) {
          $scope.id = localStorage.getItem("id");
          $scope.artist = localStorage.getItem("artist");
          $scope.album = localStorage.getItem("album");
          $scope.track = localStorage.getItem("track");
        //}
      })

      // option : write data to a text file
      $scope.update = function(id, artist, album, track) {
        DataService.id = id;
        DataService.artist = artist;
        DataService.album = album;
        DataService.track = track;

        localStorage.setItem("id",id);
        localStorage.setItem("artist", artist);
        localStorage.setItem("album", album);
        localStorage.setItem("track", track);
      }

    });
  });