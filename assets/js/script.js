var APIKey = "7151747b5bb4270eae80aab638939860";
var cityInput = document.getElementById("city-input");
var searchFormEl = document.getElementById("search-city");
var searchHistoryEl = document.getElementById("search-history");
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
var iconImage = document.createElement("img");
iconImage.setAttribute("src", "");
var cityHistory = [];
if (localStorage.getItem("searchHistory")) {
  cityHistory = JSON.parse(localStorage.getItem("searchHistory"));
}
// This function gets the city name from the search input
function getCityName(event) {
  event.preventDefault();
  var city = cityInput.value.trim();
  // If the input is null then the function will alert to search a city name
  if (city) {
    // printSearchHistory(city);
    addCityToHistory(city);
    getCityCoordinates(city);
  } else {
    alert("Please search a city name");
  }
}
// This function adds the city searched to an array and saves the array to the local storage
function addCityToHistory(city) {
  for (i = 0; i < cityHistory.length; i++) {
    if (city.toLowerCase() == cityHistory[i].toLowerCase()) {
      return;
    }
  }
  cityHistory.push(city);
  localStorage.setItem("searchHistory", JSON.stringify(cityHistory));
  printSearchHistory();
}
// This function gets the city's coordinates from the api based on the search input
function getCityCoordinates(NameOfCity) {
  // The api url is concatenated to include the parameters of the city name from the input and my personalized api key
  apiURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    NameOfCity +
    "&limit=1&appid=" +
    APIKey;

  addCityToHistory(NameOfCity);
  // the fetch method
  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
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
        response.json().then(function (data) {
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
// This function changes the background color of the UV Index to indicate whether the rating is mild, moderate or severe
function indexRating(uvIndex) {
  if (uvIndex >= 0 && uvIndex <= 2) {
    uvEl.style.backgroundColor = "green";
  } else if (uvIndex > 2 && uvIndex <= 7) {
    uvEl.style.backgroundColor = "yellow";
  } else if (uvIndex > 7) {
    uvEl.style.backgroundColor = "red";
  }
}
// This function displays the current weather for the city searched
function displayCurrent(daily, name) {
  currentCityEl.textContent = name;
  // currentDataEl.classList.add("card");
  // This logs the date of the five-day forecast
  var seconds = daily[0].dt;
  var date = new Date(0);
  date.setUTCSeconds(seconds);
  date.toString("MMM dd, yyyy");
  dataEl.textContent = date;
  currentDataEl.appendChild(dataEl);
  // This gets the temperature for the five day forecast
  var temp = daily[0].temp.day;
  tempEl.textContent = "Temperature: " + temp;
  currentDataEl.appendChild(tempEl);
  // This gets the humidity for the five day forecast
  var hum = daily[0].humidity;
  humEl.textContent = "Humidity: " + hum;
  currentDataEl.appendChild(humEl);
  // This gets the wind speed for the five day forecast
  var windSpeed = daily[0].wind_speed;
  windEl.textContent = "Windspeed: " + windSpeed;
  currentDataEl.appendChild(windEl);
  // This gets the UV Index for the five day forecast
  var uvIndex = daily[0].uvi;
  indexRating(uvIndex);
  uvEl.textContent = "UV Index: " + uvIndex;
  uvEl.style.padding = "5px";
  uvEl.style.alignSelf = "center";
  currentDataEl.appendChild(uvEl);
  // This gets the icon from the openweathermap url and appends it as an image to each weather card
  var iconCode = daily[0].weather[0].icon;
  var iconSrc = "http://openweathermap.org/img/wn/" + iconCode + ".png";
  iconImage.setAttribute("src", iconSrc);
  iconImage.style.height = "50px";
  iconImage.style.width = "50px";
  iconImage.style.backgroundColor = "#0dcaf0";
  currentDataEl.appendChild(iconImage);
}
// This function displays the five-day forecast for each city searched
function displayFiveDay(daily) {
  // 0 index is current day info
  for (let i = 1; i < 6; i++) {
    document.getElementById("forecast-day-" + i).textContent = "";
    // This logs the date of the five-day forecast
    var seconds = daily[i].dt;
    var date = new Date(0);
    date.setUTCSeconds(seconds);
    var fdataEl = document.createElement("h4");
    fdataEl.textContent = date;
    document.getElementById("forecast-day-" + i).appendChild(fdataEl);
    // This gets the temperature for the five day forecast
    var temp = daily[i].temp.day;
    var ftempEl = document.createElement("h5");
    ftempEl.textContent = "Temperature: " + temp;
    document.getElementById("forecast-day-" + i).appendChild(ftempEl);
    // This gets the humidity for the five day forecast
    var hum = daily[i].humidity;
    var fhumEl = document.createElement("h5");
    fhumEl.textContent = "Humidity: " + hum;
    document.getElementById("forecast-day-" + i).appendChild(fhumEl);
    // This gets the wind speed for the five day forecast
    var windSpeed = daily[i].wind_speed;
    var fwindEl = document.createElement("h5");
    fwindEl.textContent = "Windspeed: " + windSpeed;
    document.getElementById("forecast-day-" + i).appendChild(fwindEl);
    // This gets the UV Index for the five day forecast
    var fuvIndex = daily[i].uvi;
    var fuvEl = document.createElement("h5");
    fuvEl.textContent = "UV Index: " + fuvIndex;
    if (fuvIndex >= 0 && fuvIndex <= 2) {
      fuvEl.style.backgroundColor = "green";
    } else if (fuvIndex > 2 && fuvIndex <= 7) {
      fuvEl.style.backgroundColor = "yellow";
    } else if (fuvIndex > 7) {
      fuvEl.style.backgroundColor = "red";
    }
    document.getElementById("forecast-day-" + i).appendChild(fuvEl);
    // This gets the icon from openweathermap's icon code
    var ficonCode = daily[i].weather[0].icon;
    var ficonSrc = "http://openweathermap.org/img/wn/" + ficonCode + ".png";
    var ficonImage = document.createElement("img");
    ficonImage.setAttribute("src", ficonSrc);
    ficonImage.style.height = "50px";
    ficonImage.style.width = "50px";
    ficonImage.style.backgroundColor = "#0dcaf0";
    document.getElementById("forecast-day-" + i).appendChild(ficonImage);
  }
}
// This function prints the city name in the search History and when one of the city's names are clicked, it shows that city's current and forecasted weather
function printSearchHistory() {
  var searchArray = JSON.parse(localStorage.getItem("searchHistory"));
  searchHistoryEl.textContent = "";
  if (searchArray) {
    for (let i = 0; i < searchArray.length; i++) {
      var historyEl = document.createElement("li");
      historyEl.textContent = searchArray[i];
      historyEl.setAttribute("id", searchArray[i]);
      searchHistoryEl.appendChild(historyEl);
      searchHistoryEl.style.cursor = "pointer";
      historyEl.addEventListener("click", function (event) {
        event.preventDefault();
        var reSearch = event.target;
        var s = reSearch.id;
        getCityCoordinates(s);
      });
    }
  } else {
    return;
  }
}
searchFormEl.addEventListener("submit", getCityName);
printSearchHistory();
