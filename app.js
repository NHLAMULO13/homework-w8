function refreshWeather(response) {
  let temperatureElement = document.querySelector("#degrees");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#city-weather");
  city.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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

function displayForecast() {
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
displayForecast();
