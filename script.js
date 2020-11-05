$(document).ready(function () {
  console.log("click test");
  // TEST FOR AL
  var cityInput = "San Diego";
  var dateInput = "2020-12-25";
  var currentWeather =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput +
    "&units=imperial&APPID=7455a546f39f9c232db77780672611f7";

    // get the longitude and latitude, and the timezone of the city searched
  $.ajax({
    url: currentWeather,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $("#cityInput").text(cityInput);
    var latitude = response.coord.lat;
    var longitude = response.coord.lon;

    // create a new url for the sunset information
    var futureSunset =
      "https://api.sunrise-sunset.org/json?lat=" +
      latitude +
      "&lng=" +
      longitude +
      "&date=" +
      dateInput;

      // call the future sunset info
    $.ajax({
      url: futureSunset,
      method: "GET",
    }).then(function (responseSun) {
      console.log(responseSun);
      // use the timezone from the current weather call
      var timeOffset = response.timezone / 3600;
      console.log("time offset: " + timeOffset);

      // get the sunset time in UTC
      var time = responseSun.results.sunset;
      // pull the hours, minutes, and am or pm from the string
      var hours = Number(time.match(/^(\d+)/)[1]);
      var minutes = Number(time.match(/:(\d+)/)[1]);
      var AMPM = time.match(/\s(.*)$/)[1];
      if (AMPM == "PM" && hours < 12) hours = hours + 12;
      if (AMPM == "AM" && hours == 12) hours = hours - 12;

      // if hours is 0 then set hours = 24+timeOffset
      if (hours == 0) {
        hours = 24 + timeOffset;
      }
      // else hours=hours+timeOffset
      else {
        hours = hours + timeOffset;
        console.log(hours);
      }

      var sHours = hours.toString();
      var sMinutes = minutes.toString();
      // add leading 0 to numbers less than 10
      if (hours < 10) sHours = "0" + sHours;
      if (minutes < 10) sMinutes = "0" + sMinutes;
      // log the local military time of the sunset
      console.log(sHours + sMinutes);
    });
  });
});
