(function(){
'use strict';

//today's date ***************************************************
    var today = new Date().toISOString().slice(0, 10).split('-'),
        year = today[0],
        month = today[1],
        day = today[2],
        apiToday = today.join('-');

    $('.nav-wrapper').append([month, day, year].join('.'));


// var declarations **********************************************
    var userInputCity, userInputMiles, userInputArtist, userInputState;

    var proxyUrl = 'https://g-bandsintown.herokuapp.com/artists/';
    var apiKey = '/events.json?api_version=2.0&app_id=215155712241649';
    var apiURL;


//************SEARCH CITY/STATE/RADIUS*************************************
      $('#searchBtn').on('click', function(){
      event.preventDefault();

       userInputCity = $('#search-by-city').val();
      //  console.log(userInputCity);
       userInputState = $('#search-by-state').val();
      //  console.log(userInputState);
      // var filterLocation = so it will work for Caps and low
       userInputMiles = $('#search-by-radius').val();
      //  console.log(userInputMiles);
      // var upcoming = apiToday + ;
//       https://g-bandsintown.herokuapp.com/events/search.json?api_version=2.0&app_id=215155712241649
// // &location='Loveland,Colorado'
// // &radius=5;


      apiURL='https://g-bandsintown.herokuapp.com/events/search.json?api_version=2.0&app_id=215155712241649&location='+ userInputCity + ',' + userInputState + '&radius=' + userInputMiles + '&date=' + upcoming;

      // addTable(apiData);
      getData(apiURL);

    });
//************SEARCH ARTIST**************************************
    $('#searchBtn2').on('click', function(){
      event.preventDefault();
      userInputArtist = $('#search-by-artist').val();
      // console.log(userInputArtist);
      apiURL = `${proxyUrl}${userInputArtist}${apiKey}`;
      // console.log(userInputArtist);
      getData(apiURL);
      // console.log(apiURL);
      $('#search-by-artist').empty();
});
//*************************************info helps*********


// `my name is ${userInputCity}` //template literals
// if they use use it if not use default
//example

//http://api.bandsintown.com/artists/ Skrillex/    events/recommended?location=Boston,MA&radius=10&app_id=YOUR_APP_ID&api_version=2.0&format=json


//getting detail data from api ***********************************
    var apiData= [];
    function getData(apiURL) {
      var $xhr = $.getJSON(apiURL); //getJSON

      $xhr.done(function(data) {   //.done
          if ($xhr.status !== 200) {
              return;
          }
          // console.log(data);
          for (var i = 0; i < data.length; i++) {
            var obj = {
              artist: data[i].artists[0].name,
              venue: data[i].venue.name,
              city: data[i].venue.city,
              region: data[i].venue.region,
              venueLat: data[i].venue.latitude,
              venueLng: data[i].venue.longitude,
              time: data[i].datetime.slice(11,16),
              dat: data[i].datetime.slice(0,10),
              url: data[i].venue.url //returns undefined!!!!
            };
            apiData.push(obj);
          }
          console.log(apiData);
          addTable(apiData);
      });
    }
//appending data to the table *********************************************
    function addTable(apiData) {
      for (var i = 0; i < apiData.length; i++) {
        if (apiData) {
          // console.log(apiData[i]);
          if ((apiData[i].region).match(/[^0-9]/)){
          $("<tr></tr>").appendTo( '.highlight tbody' ).append('<tr id="'+i+'"><td class="time">'+apiData[i].time+'</td><th id="listen">' + apiData[i].dat + '</td><td>' + apiData[i].artist + '</th><td id="'+i+'">' + apiData[i].venue + '</td><td>' + apiData[i].city + '</td><td>' +
          apiData[i].region + '</td><td>'
          // apiData[i].url + ' target="_blank">Tickets</a></td></tr>
        );}
          else {
          $("<tr></tr>").appendTo( '.highlight tbody' ).append('<tr id="'+i+'"><td class="time">'+apiData[i].time+'</td><th id="listen">' + apiData[i].artist + '</th><td id="'+i+'">' + apiData[i].venue + '</td><td>' + apiData[i].city +  '</td><td>'
        );}
        }
      }
    }

})();




// for (var i = 0; i < res.length; i++) {
//                     musician = res[i].artists[0].name;
//                     var venue = res[i].venue.name;
//                     var url = res[i].venue.url;
//                     var venueLat = res[i].venue.latitude;
//                     var venueLng = res[i].venue.longitude;
//                     var time = res[i].datetime.slice(11,16);
//                     map.setCenter({
//                         lat: myLat,
//                         lng: myLng
//                     });
//                     $('#table').append('<tr id="'+i+'"><td class="time">'+ time +'</td><th id="listen">' + musician + '</th><td id="'+i+'">' + venue + '</td><td><a href=' + url + ' target="_blank">Tickets</a></td></tr>');


//1.get deta and locate it somewhere
//2.var for each type of deta:
//artist - 'name'
//city, state
//time
//3.create table and add input
