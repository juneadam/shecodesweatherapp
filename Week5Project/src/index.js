function displayTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentHour = now.getHours();
  let AMPM = `AM`;
  if (currentHour === 0) {
    currentHour = currentHour + 12;
    AMPM = `AM`;
  }
  if (currentHour === 12) {
    AMPM = `PM`;
  }
  if (currentHour > 12) {
    currentHour = currentHour - 12;
    AMPM = `PM`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0` + currentMinutes;
  }

  let sentence = `${currentDay}, ${currentMonth} ${currentDate}, ${currentHour}:${currentMinutes} ${AMPM}`;
  return sentence;
}

let now = new Date();
let dateInput = document.querySelector("#date-input");
dateInput.innerHTML = displayTime(now);

function logTemp(event) {
  event.preventDefault();
  let cityInput = document.querySelector(`#search-box`);
  let cityInputValue = cityInput.value;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&units=${units}&appid=${apiKey}`;
  console.log(`${apiUrl}`);
  axios.get(apiUrl).then(callSearchLocation);
}

function callSearchLocation(response) {
  console.log(response.data);
  let cityMutable = document.querySelector("#city-mutable");
  let cityName = response.data.name;
  let country = response.data.sys.country;
  let weatherDescription = document.querySelector("#weather-description");
  let weatherPull = response.data.weather[0];
  let actualDescription = weatherPull.main;
  let tempMax = document.querySelector("#temp-max");
  let tempMin = document.querySelector("#temp-min");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let currentTemp = document.querySelector("#todays-temp-num");
  cityMutable.innerHTML = `${cityName}, ${country}`;
  weatherDescription.innerHTML = `${actualDescription}`;
  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  currentTemp.innerHTML = Math.round(response.data.main.temp);
}

let apiKey = "0588a097340959e1dcf00479a90c9866";
let cityEvent = document.querySelector(`#city-search-form`);
cityEvent.addEventListener("submit", logTemp);

function getPosition() {
  navigator.geolocation.getCurrentPosition(catchTemp);
}

function catchTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCurrentLocation);
}

function displayCurrentLocation(response) {
  console.log(response.data);
  let cityMutable = document.querySelector("#city-mutable");
  let cityName = response.data.name;
  let country = response.data.sys.country;
  let weatherDescription = document.querySelector("#weather-description");
  let weatherPull = response.data.weather[0];
  let actualDescription = weatherPull.main;
  let tempMax = document.querySelector("#temp-max");
  let tempMin = document.querySelector("#temp-min");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let currentTemp = document.querySelector("#todays-temp-num");
  cityMutable.innerHTML = `${cityName}, ${country}`;
  weatherDescription.innerHTML = `${actualDescription}`;
  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  currentTemp.innerHTML = Math.round(response.data.main.temp);
}

let currentLocation = document.querySelector("#current-geoloc");
currentLocation.addEventListener("click", getPosition);
