var APIKey = "7151747b5bb4270eae80aab638939860";
var cityInput = document.getElementById("city-input");
var searchFormEl = document.getElementById("search-city");
var currentWeatherEl = document.getElementById("current-weather");
var currentDataEl = document.getElementById("current-data");
var currentCityEl = document.getElementById("current-city");
var forecastEl = document.getElementById("forecast-weather");
var forecastDataEl = document.querySelector("forecast-data");

var dataEl = document.createElement("h4");
dataEl.textContent = "";
var tempEl = document.createElement("h5");
tempEl.textContent = "";
var humEl = document.createElement("h5");
humEl.textContent = "";
var windEl = document.createElement("h5");
windEl.textContent = "";
var uvEl = document.createElement("h5");
uvEl.textContent = "";

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
          console.log(data.daily);
          displayCurrent(data.daily, name);
          displayFiveDay(data.daily);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather Map");
    });
}

function displayCurrent(daily, name) {
  console.log(name);
  currentCityEl.textContent = name;
  // currentDataEl.classList.add("card");
  // This logs the date of the five-day forecast
  console.log(daily[0].dt);
  var seconds = daily[0].dt;
  var date = new Date(0);
  date.setUTCSeconds(seconds);
  console.log(date);

  dataEl.textContent = date;
  currentDataEl.appendChild(dataEl);
  // This gets the temperature for the five day forecast
  console.log(daily[0].temp.day);
  var temp = daily[0].temp.day;

  tempEl.textContent = "Temperature: " + temp;
  currentDataEl.appendChild(tempEl);
  // This gets the humidity for the five day forecast
  console.log(daily[0].humidity);
  var hum = daily[0].humidity;

  humEl.textContent = "Humidity: " + hum;
  currentDataEl.appendChild(humEl);
  // This gets the wind speed for the five day forecast
  console.log(daily[0].wind_speed);
  var windSpeed = daily[0].wind_speed;

  windEl.textContent = "Windspeed: " + windSpeed;
  currentDataEl.appendChild(windEl);
  // This gets the UV Index for the five day forecast
  console.log(daily[0].uvi);
  var uvIndex = daily[0].uvi;

  uvEl.textContent = "UV Index: " + uvIndex;
  currentDataEl.appendChild(uvEl);
}

function displayFiveDay(daily) {
  
  // 0 index is current day info
  for (let i = 1; i < 6; i++) {
    // This logs the date of the five-day forecast
    console.log(daily[i].dt);
    var seconds = daily[i].dt;
    var date = new Date(0);
    date.setUTCSeconds(seconds);
    console.log(date);
    var fdataEl = document.createElement("h4");
    fdataEl.textContent = date;
    document.getElementById("forecast-day-"+i).appendChild(fdataEl);
    // This gets the temperature for the five day forecast
    console.log(daily[i].temp.day);
    var temp = daily[i].temp.day;
    var ftempEl = document.createElement("h5");
    ftempEl.textContent = "Temperature: " + temp;
    document.getElementById("forecast-day-"+i).appendChild(ftempEl);
    // This gets the humidity for the five day forecast
    console.log(daily[i].humidity);
    var hum = daily[i].humidity;
    var fhumEl = document.createElement("h5");
    fhumEl.textContent = "Humidity: " + hum;
    document.getElementById("forecast-day-"+i).appendChild(fhumEl);
    // This gets the wind speed for the five day forecast
    console.log(daily[i].wind_speed);
    var windSpeed = daily[i].wind_speed;
    var fwindEl = document.createElement("h5");
    fwindEl.textContent = "Windspeed: " + windSpeed;
    document.getElementById("forecast-day-"+i).appendChild(fwindEl);
    // This gets the UV Index for the five day forecast
    console.log(daily[i].uvi);
    var uvIndex = daily[i].uvi;
    var fuvEl = document.createElement("h5");
    fuvEl.textContent = "UV Index: " + uvIndex;
    document.getElementById("forecast-day-"+i).appendChild(fuvEl);
  }
}

searchFormEl.addEventListener("submit", getCityName);
