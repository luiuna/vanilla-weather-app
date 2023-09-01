
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


// search engine: a search bar with a button. When searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function handleSubmit(event) {
  event.preventDefault();
  let yourcity = document.querySelector("#city-input");
  
  let apiKey = "1a1a6bb4e25910414ad6e4a6f8bc9219"
  let units = "metric"
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${yourcity.value}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayTemperature);
  
 
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

//when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
function displayTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${currentTemperature}`;
  let description = response.data.weather[0].main;
  let currentDescription =document.querySelector("#description");
  currentDescription.innerHTML = `${description}`;
 let feelsLike = Math.round(response.data.main.feels_like);
let feelsLikeDisplay = document.querySelector ("#feels-like");
feelsLikeDisplay.innerHTML = `Feels like: ${feelsLike}°C`;
let humidity = response.data.main.humidity;
let humidityDisplay = document.querySelector ("#humidity");
humidityDisplay.innerHTML = `Humidity: ${humidity}%`;
let wind = response.data.wind.speed;
let windDisplay = document.querySelector ("#wind");
windDisplay.innerHTML = `Wind: ${wind}km/h`;
let city = response.data.name;
let cityDisplay = document.querySelector ("h2")
cityDisplay.innerHTML = `${city}`;
let icon = response.data.current.weather.icon;
let showIcon = document.querySelector("#icon");
showIcon.innerHTML = `${icon}`;
}

function retrievePosition(position) {
  let apiKey = "1a1a6bb4e25910414ad6e4a6f8bc9219";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  
  let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${url2}`).then(displayTemperature);
}

function currentBtn() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
  }
  
navigator.geolocation.getCurrentPosition(retrievePosition);



let button = document.querySelector("#current");
button.addEventListener("click", currentBtn);

// convert units
