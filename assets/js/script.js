var APIKey = "7151747b5bb4270eae80aab638939860";
var cityInput = document.getElementById("city-input");
var searchFormEl = document.getElementById("search-city");

function getCityName(event) {
  event.preventDefault();

  var city = cityInput.value.trim();
  if (city) {
    getCityCoordinates(city);
  } else {
    alert("Please search a city name");
  }
  // console.log(city);
};

function getCityCoordinates(NameOfCity) {
  apiURL = "http://api.openweathermap.org/geo/1.0/direct?q="+ NameOfCity +"&limit=1&appid=" + APIKey;

  fetch(apiURL)
    .then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        var cityName = data[0].name;
        var cityLat = data[0].lat;
        var cityLon = data[0].lon;
        getCityWeather(cityName, cityLat, cityLon);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error){
    alert('Unable to connect to Open Weather Map');
  });
};

function getCityWeather(name, lat, lon){
  apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&exclude=minutely,hourly&appid=" + APIKey;

  fetch(apiURL)
    .then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        var currentW = data.current.weather[0].main;
        console.log(data.daily[0].dt);
        var seconds = data.daily[0].dt;
        var date = new Date(0);
        date.setUTCSeconds(seconds);
        console.log(date);
        
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error){
    alert('Unable to connect to Open Weather Map');
  });
};




searchFormEl.addEventListener("submit", getCityName);
