function refreshWeather(response) {
  let temperatureElement = document.querySelector("#degrees");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#city-weather");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}"class="weather-icon"/>`;

  city.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  timeElement.innerHTML = formatDate(date);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function citySearch(city) {
  let apiKey = "aa8t7e70fb21d2d41f6fo0b32468a4f3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  citySearch(searchInput.value);
}
function getForcast(city) {
  let apiKey = "aa8t7e70fb21d2d41f6fo0b32468a4f3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="weather-forecast-day">
  <div class="weather-forecast-date">${day}</div>
  <div class="weather-forecast-icon">⛅</div>
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
      <strong>15°</strong>
    </div>
    <div class="weather-forecast-temperature">9°</div>
  </div>
</div>
`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;

  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSearchSubmit);
  citySearch("Pretoria");
}
getForcast("Pretoria");
