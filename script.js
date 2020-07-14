// # 06 Server-Side APIs: Weather Dashboard

// Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

// Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

// ## User Story

// ```
// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly
// ```

// var iconCode = response.weather[0].icon;
// var iconImage = "http://openweathermap.org/img/w/" + iconCode + ".png";
// console.log(iconCode);
// $("icon-image").attr("src", iconImage);
//   });
// });

// var lat = response.coord.lat
// var long = response.coord.lon

// DEPENDENCIES ========
$(document).ready(() => {
  console.log("ready!");
});

// Id for the searchbar text
var searchButton = $("#city-info-button");
searchButton.click(function (event) {
  //targeting the text area
  var citySearch = $("#citySearch").val();
  console.log("citySearch = ", citySearch);
  var APIKey = "c257cb037b478e85c2eddd6f4749b211";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
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
    // Create CODE HERE to log the resulting object
    console.log(response);

    //temperature (f)
    var temperature = response.main.temp;
    console.log(temperature);

    var currentCityName = $("#currentCityName");
    currentCityName.text(citySearch);
    var currentCityDate = $("#currentCityDate");
    currentCityDate.text(moment().format("LLLL"));
    var currentCityTemp = $("#currentCityTemp");
    var currentCityHumidity = $("#currentCityHumidity");
    var currentCityWindSpeed = $("currentCityWindSpeed");

    var latitude = response.coord.lat;
    var longitude = response.coord.lon;
    var uvURL =
     "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      APIKey +
      "&lat=" +
      latitude +
      "&lon=" +
      longitude;
  });
});

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
