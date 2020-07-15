TODO:input - city name
weather API  
input cityname into API 5 day forecast

THEN I am presented with current and future conditions for that city and that city is added to the search history

TODO:api returns weather condition for the city and the city is added to search history - local storage

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

TODO:results of the api should include all from the API, present data on a card
city name
date
icon for weather
temperature
humidity
wind speed
UV index

WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

TODO:uv index color. if statement
if UV <> index 1 favorable
if UV <> index 2 moderate
if UV <> index 3 severe

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

TODO:results not only 1 day but rather for a 5 day forecast
copy the card 5x and target the api data into each card

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

TODO:get from local storage, using drop down
anything searched will be added to the drop down
anything selected from the drop down will be displayed

WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast

TODO:get from local storage the last city

Assets\06-server-side-apis-homework-demo.png

used ajax to pull data and added to bootstrap cards to show the weather conditions

        city name
        date
        icon for weather
        temperature
        humidity
        wind speed
        UV index
            UV index has a color coded background that let's us know strong the sun is

used an api for the current date, and another for the 5 forecast which gives the weather at noon for the city
added a history to store searched cities
