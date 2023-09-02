
//In your project, display the current date and time
function updateTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayElement = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayElement];
  return `${day}, ${hours}:${minutes}`;
}


let currentDate = document.querySelector("#current-time");
let dateElement = new Date();
currentDate.innerHTML = updateTime(dateElement);

//format forecast day
function formatForecastDate(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
return days[day];
}


//display the forecast 

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="forecast-date">${formatForecastDate(forecastDay.time)}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png";
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="forecast-temperature-max" > ${Math.round(forecastDay.temperature.maximum)}° </span>
          <span class="forecast-temperature-min"> ${Math.round(forecastDay.temperature.minimum)}° </span>
        </div>
      </div>
  `;
}
});

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
 
}



// search engine: a search bar with a button. When searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function searchEngine(event) {
  event.preventDefault();
  let yourcity = document.querySelector("#city-input");
  
  let apiKey = "aa443td2ed3a26cd6de4cd01fe8bo0b5"
  let units = "metric"
  let url = `https://api.shecodes.io/weather/v1/current?query=${yourcity.value}&key=${apiKey}&units=${units}`;
  axios.get(url).then(displayTemperature);
  
 
}

// weather forecast API

function weatherForecast(coordinates) {
let apiKey = "aa443td2ed3a26cd6de4cd01fe8bo0b5";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${coordinates}&key=${apiKey}`;
console.log (apiUrl)
axios.get(apiUrl).then(displayForecast);
}

//when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
function displayTemperature(response) {

  celsiusTemperature = response.data.temperature.current;
  let currentTemperature = Math.round(celsiusTemperature);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${currentTemperature}`;

   

  let description = (response.data.condition.description).substring(0, 1).toUpperCase() + (response.data.condition.description).substring(1);
  let currentDescription =document.querySelector("#description");
  currentDescription.innerHTML = `${description}`;

 let feelsLike = Math.round(response.data.temperature.feels_like);
let feelsLikeDisplay = document.querySelector ("#feels-like");
feelsLikeDisplay.innerHTML = `Feels like: ${feelsLike}°C`;

let humidity = response.data.temperature.humidity;
let humidityDisplay = document.querySelector ("#humidity");
humidityDisplay.innerHTML = `Humidity: ${humidity}%`;

let wind = response.data.wind.speed;
let windDisplay = document.querySelector ("#wind");
windDisplay.innerHTML = `Wind: ${wind}km/h`;

let city = (response.data.city).substring(0, 1).toUpperCase() + (response.data.city).substring(1);
let cityDisplay = document.querySelector ("h2")
cityDisplay.innerHTML = `${city}`;

let iconElement = document.querySelector("#icon");
iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
iconElement.setAttribute("alt", response.data.condition.icon);


weatherForecast(response.data.city);

 }


// get current location
function retrievePosition(position) {
  let apiKey = "aa443td2ed3a26cd6de4cd01fe8bo0b5";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  
  let url2 = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(`${url2}`).then(displayTemperature);
}


  
navigator.geolocation.getCurrentPosition(retrievePosition);




// convert units

function showFahrenheitTemp(event) {
event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}




//global variables

let fahrenheitLink = document.querySelector ("#fahrenheit-link");
fahrenheitLink.addEventListener ("click", showFahrenheitTemp);

let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener ("click", showCelsiusTemp);

let celsiusTemperature = null;

let form = document.querySelector("form");
form.addEventListener("submit", searchEngine);



