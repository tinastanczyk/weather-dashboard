var APIKey = "7151747b5bb4270eae80aab638939860";
var cityInput = document.getElementById("city-input");
var searchFormEl = document.getElementById("search-city");

// This function gets the city name from the search input
function getCityName(event) {
  event.preventDefault();

  var city = cityInput.value.trim();
  // If the input is null then the function will alert to search a city name
  if (city) {
    getCityCoordinates(city);
  } else {
    alert("Please search a city name");
  }
}

// This function gets the city's coordinates from the api based on the search input
function getCityCoordinates(NameOfCity) {
  // The api url is concatenated to include the parameters of the city name from the input and my personalized api key
  apiURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    NameOfCity +
    "&limit=1&appid=" +
    APIKey;
  // the fetch method
  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          // The data received gives the name of the city, latitude and longitude
          var cityName = data[0].name;
          var cityLat = data[0].lat;
          var cityLon = data[0].lon;
          // I pass in these variables to the function that gets the specific coordinate's weather data
          getCityWeather(cityName, cityLat, cityLon);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather Map");
    });
}
// This function gets the city's weather from the city's latitude and longitude coordinates
function getCityWeather(name, lat, lon) {
  apiURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly&units=imperial&appid=" +
    APIKey;

  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          var currentW = data.current.weather[0].main;
          console.log(data.daily);
          for (let i = 0; i < 5; i++) {
            // This logs the date of the five-day forecast
            console.log(data.daily[i].dt);
            var seconds = data.daily[i].dt;
            var date = new Date(0);
            date.setUTCSeconds(seconds);
            console.log(date);
            // This gets the temperature for the five day forecast
            console.log(data.daily[i].temp.day);
            var temp = data.daily[i].temp.day;
            // This gets the humidity for the five day forecast
            console.log(data.daily[i].humidity);
            var hum = data.daily[i].humidity;
            // This gets the wind speed for the five day forecast
            console.log(data.daily[i].wind_speed);
            var windSpeed = data.daily[i].wind_speed;
            // This gets the UV Index for the five day forecast
            console.log(data.daily[i].uvi);
            var uvIndex = data.daily[i].uvi;
          }
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather Map");
    });
}

searchFormEl.addEventListener("submit", getCityName);
