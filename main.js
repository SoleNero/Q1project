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
      if ($("#search-by-radius") === 0){
        apiURL='https://g-bandsintown.herokuapp.com/events/search.json?api_version=2.0&app_id=215155712241649&location='+ userInputCity + ',' + userInputState + '&radius=50' + '&date=' + apiToday;
      } else {
      apiURL='https://g-bandsintown.herokuapp.com/events/search.json?api_version=2.0&app_id=215155712241649&location='+ userInputCity + ',' + userInputState + '&radius=' + userInputMiles + '&date=' + apiToday;
      }   
      // addTable(apiData);
      getData(apiURL);
      console.log(apiURL);

    });
//************SEARCH ARTIST**************************************
    $('#searchBtn2').on('click', function(){
      event.preventDefault();
      userInputArtist = $('#search-by-artist').val();
      // console.log(userInputArtist);
      apiURL = `${proxyUrl}${userInputArtist}${apiKey}`;
      // console.log(userInputArtist);
      getData(apiURL);

});
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

        // console.log('about to call the emptyTable function');
        addTable(apiData);


      });
    }
//appending data to the table *********************************************
    //
    // function emptyTable(apiData, cb) {
    //   // console.log("made it to the emptyTable function");
    //   // console.log($('#table'));
    //   $("#table_id > tbody").html("");
    //   // console.log('about to call the addTable function');
    //   cb(apiData);
    // }


    function addTable(apiData) {
      // console.log('just entered the addTable function');
      $( '#input' ).each(function(){ //removes values in form
      this.reset();
      });
      for (var i = 0; i < apiData.length; i++) {
        if (apiData) {
          // console.log(apiData[i]);
          if ((apiData[i].region).match(/[^0-9]/)){
          $('<tr id="'+i+'"></tr>').appendTo( '.highlight tbody' ).append('<td class="time">'+apiData[i].time+'</td><td id="listen">' + apiData[i].dat + '</td><td>' + apiData[i].artist + '</td><td id="'+i+'">' + apiData[i].venue + '</td><td>' + apiData[i].city + '</td><td>' +
          apiData[i].region + '</td><td></td>'
          // apiData[i].url + ' target="_blank">Tickets</a>

        );}
          else {
          $('<tr id="'+i+'"></tr>').appendTo( '.highlight tbody' ).append('<td class="time">'+apiData[i].time+'</td><td id="listen">' + apiData[i].dat + '</td><td>' + apiData[i].artist + '</td><td id="'+i+'">' + apiData[i].venue + '</td><td>' + apiData[i].city + '</td><td>'
        );}
        }

      }

    }



})();

//1.get deta and locate it somewhere
//2.var for each type of deta:
//artist - 'name'
//city, state
//time
//3.create table and add input
