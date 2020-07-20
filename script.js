$(document).ready(() => {
  console.log("ready!");
});

// Id for the searchbar text
var searchButton = $("#city-info-button");

// array for accepting cities for saving to local storage
var cities = [];

searchButton.click(function (event) {
  var city = $("#citySearch").val();
  var newLi = $("<li>");
  newLi.text(city);
  $("#city-list").append("<li>" + city + "</li>");
  cities.push(city);
  console.log("cititesarr", cities);
  localStorage.setItem("cities", cities);
  var storedCitites = localStorage.getItem("cities");
  console.log("storedcities = ", storedCitites);
  var newCitiesArray = storedCitites.split(",");
  // for(var i = 0; i < newCitiesArray.length; i++) {
  //   var newLi = $("<li>")
  //   newLi.text(newCitiesArray[i]);
  //   $("#city-list").append("<li>" + newCitiesArray[i] + "<li");
  // }

  //targeting the text area
  var citySearch = $("#citySearch").val();
  console.log("citySearch = ", citySearch);
  var APIKey = "c257cb037b478e85c2eddd6f4749b211";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    citySearch +
    "&appid=" +
    APIKey +
    // added to get imperial units of measure
    "&units=imperial";
  console.log("queryURL = ", queryURL);
  // to prevent the website from reloading on button press
  event.preventDefault();

  // AJAX call
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // log the resulting object response
    console.log(response);

    //temperature (f)
    var currentCityTempEl = $("#currentCityTemp");
    currentCityTempEl.text(response.main.temp);
    console.log();

    //name
    var currentCityNameEl = $("#currentCityName");
    var name = currentCityNameEl.text(response.name);
    name;

    //date
    var currentCityDateEl = $("#currentCityDate");
    currentCityDateEl.text(moment().format("LLLL"));

    //temp
    var currentCityTempEl = $("#currentCityTemp");
    currentCityTempEl.text(response.main.temp);
    console.log("currentwindspeed = ", response.main.temp);

    //humidity
    var currentCityHumidityEl = $("#currentCityHumidity");
    currentCityHumidityEl.text(response.main.humidity);
    console.log("currenthumidity = ", response.main.humidity);

    //wind speed
    var currentCityWindSpeedEl = $("#currentCityWindSpeed");
    currentCityWindSpeedEl.text(response.wind.speed);
    console.log("currentwindspeed = ", response.wind.speed);

    //icon
    var iconCode = response.weather[0].icon;
    var iconImage = "https://openweathermap.org/img/w/" + iconCode + ".png";
    console.log("iconcode = ", iconCode);
    $("#icon-image").attr("src", iconImage);
    $("#icon-image").attr("alt", iconImage);

    // creating variables for latitude and longitude
    // UV index URL
    var latitude = response.coord.lat;
    var longitude = response.coord.lon;
    var uvQueryURL =
      "https://api.openweathermap.org/data/2.5/uvi?appid=" +
      APIKey +
      "&lat=" +
      latitude +
      "&lon=" +
      longitude;

    $.ajax({
      url: uvQueryURL,
      method: "GET",
    }).then(function (result) {
      console.log("UVobject = ", result);
      var uvIndex = result.value;
      //UV index classes set via adding classes to the UV ID based on the UV index
      $("#currentUVindex").text(uvIndex);
      if (uvIndex < 2) {
        $("#currentUVindex").attr("class", "low");
        console.log("You're safe!");
      }
      if (uvIndex >= 2 && uvIndex <= 5) {
        $("#currentUVindex").attr("class", "moderate");
        console.log("Getting risky");
      }
      if (uvIndex > 5 && uvIndex <= 7) {
        $("#currentUVindex").attr("class", "high");
        console.log("Drop it like it's hot");
      }
      if (uvIndex > 7 && uvIndex <= 10) {
        $("#currentUVindex").attr("class", "very-high");
        console.log("You better stay inside!");
      }
      if (uvIndex > 10) {
        $("#currentUVindex").attr("class", "extreme");
        console.log("This girl is on fiyah");
      }
    });
  });

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //forcast cards
  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  // five Day Forecast
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    citySearch +
    "&appid=c7629276d88b73d9dee17485c554906b" +
    "&units=imperial";
  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (response) {
    console.log("forecast = ", response);

    // Day one
    var firstDay = moment(response.list[3].dt_txt).format("dddd MMMM Do YYYY");
    $("#one").text(firstDay);
    console.log(firstDay);

    $("#temperature-one").text(response.list[3].main.temp);
    $("#humidity-one").text(response.list[3].main.humidity);
    $("#wind-speed-one").text(response.list[3].wind.speed);
    //icon
    var iconCode = response.list[3].weather[0].icon;
    var iconImage = "https://openweathermap.org/img/w/" + iconCode + ".png";
    console.log("iconcode = ", iconCode);
    $("#icon-image1").attr("src", iconImage);
    $("#icon-image1").attr("alt", iconImage);

    // Day two
    var secondDay = moment(response.list[11].dt_txt).format(
      "dddd MMMM Do YYYY"
    );
    $("#two").text(secondDay);
    console.log(secondDay);

    $("#temperature-two").text(response.list[11].main.temp);
    $("#humidity-two").text(response.list[11].main.humidity);
    $("#wind-speed-two").text(response.list[11].wind.speed);
    //icon
    var iconCode = response.list[11].weather[0].icon;
    var iconImage = "https://openweathermap.org/img/w/" + iconCode + ".png";
    console.log("iconcode = ", iconCode);
    $("#icon-image2").attr("src", iconImage);
    $("#icon-image2").attr("alt", iconImage);

    // Day three
    var thirdDay = moment(response.list[19].dt_txt).format("dddd MMMM Do YYYY");
    $("#three").text(thirdDay);
    console.log(thirdDay);

    $("#temperature-three").text(response.list[19].main.temp);
    $("#humidity-three").text(response.list[19].main.humidity);
    $("#wind-speed-three").text(response.list[19].wind.speed);
    //icon
    var iconCode = response.list[19].weather[0].icon;
    var iconImage = "https://openweathermap.org/img/w/" + iconCode + ".png";
    console.log("iconcode = ", iconCode);
    $("#icon-image3").attr("src", iconImage);
    $("#icon-image3").attr("alt", iconImage);

    // Day four
    var fourthDay = moment(response.list[27].dt_txt).format(
      "dddd MMMM Do YYYY"
    );
    $("#four").text(fourthDay);
    console.log(fourthDay);

    $("#temperature-four").text(response.list[27].main.temp);
    $("#humidity-four").text(response.list[27].main.humidity);
    $("#wind-speed-four").text(response.list[27].wind.speed);
    //icon
    var iconCode = response.list[27].weather[0].icon;
    var iconImage = "https://openweathermap.org/img/w/" + iconCode + ".png";
    console.log("iconcode = ", iconCode);
    $("#icon-image4").attr("src", iconImage);
    $("#icon-image4").attr("alt", iconImage);

    // Day five
    var fifthDay = moment(response.list[35].dt_txt).format("dddd MMMM Do YYYY");
    $("#five").text(fifthDay);
    console.log(fifthDay);

    $("#temperature-five").text(response.list[35].main.temp);
    $("#humidity-five").text(response.list[35].main.humidity);
    $("#wind-speed-five").text(response.list[35].wind.speed);
    //icon
    var iconCode = response.list[35].weather[0].icon;
    var iconImage = "https://openweathermap.org/img/w/" + iconCode + ".png";
    console.log("iconcode = ", iconCode);
    $("#icon-image5").attr("src", iconImage);
    $("#icon-image5").attr("alt", iconImage);
  });

  // pushInfo();
});

// function pushInfo() {
//       if (!pastCityArr.includes(citySearch)) {
//         pastCityArr.push(citySearch);
//         localStorage.setItem("pastCityArr", JSON.stringify(pastCityArr));
//         console.log("pastCityArr = ", pastCityArr);
//       }
// }

// Create CODE HERE to transfer content to HTML

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city

// TODO:
// create a search bar that can accept a city name
// save the city name
// input - city name
// weather API
// input cityname into API 5 day forecast
// output data into a card with all the city info

// THEN I am presented with current and future conditions for that city and that city is added to the search history

// TODO:api returns weather condition for the city and the city is added to search history -  local storage

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

// TODO:results of the api should include all from the API, present data on a card
// city name
// date
// icon for weather
// temperature
// humidity
// wind speed
// UV index

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// TODO:uv index color. if statement
// if UV <> index 1 favorable
// if UV <> index 2 moderate
// if UV <> index 3 severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

// TODO:results not only 1 day but rather for a 5 day forecast
// copy the card 5x and target the api data into each card

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// TODO:get from local storage, using drop down
// anything searched will be added to the drop down
// anything selected from the drop down will be displayed

// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast

// TODO:get from local storage the last city
