(function(){
'use strict';

//setting today's date
    var today = new Date().toISOString().slice(0, 10).split('-'),
        year = today[0],
        month = today[1],
        day = today[2],
        apiToday = today.join('-');

    $('nav').append([month, day, year].join('.'));

    // var declarations
    var results = document.querySelector('#listings');
    var userInputCity, userInputRadius, userInputArtist;
    var form = document.querySelector('form');

    var proxyUrl = 'https://g-bandsintown.herokuapp.com/artists/';
    var apiKey = '/events.json?api_version=2.0&app_id=215155712241649';
    var apiURL = proxyUrl + userInputArtist + apiKey;
    console.log(apiURL);

    var button = document.querySelectorAll('button');
    for (var i = 0; i < button.length; i++) {
      button[i].addEventListener('click', function (event) {
        event.preventDefault();

        // userInputCity = document.getElementById('search-by-city').value;
        // userInputRadius = document.getElementById('search-by-radius').value;

        userInputArtist = document.getElementById('search-by-artist').value;
        apiURL = proxyUrl + userInputArtist + apiKey;

        console.log(userInputArtist);
        console.log(apiURL);
        getData(apiURL);
      });
    }
    //function grabbing data
    function getData(apiURL) {
      var $xhr = $.getJSON(apiURL);
      $xhr.done(function(data) {
          if ($xhr.status !== 200) {
              return;
          }
            console.log(data);
      });
    }





})();


//1.get deta and locate it somewhere
//2.var for each type of deta:
//artist - 'name'
//city, state
//time
//3.create table and add input
