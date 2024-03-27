function displayTemperature(response) {
    console.log(response.data); // if i want to know exactly what can be shown
    let temperature = Math.round(response.data.temperature.current);
    let changeTemp = document.querySelector(".weather-app-temperature");
    changeTemp.innerHTML= temperature;
    let h1 = document.querySelector("h1");
    h1.innerHTML = response.data.city;
    let description = document.querySelector(".description");
    description.innerHTML= response.data.condition.description;
    let humidity = document.querySelector(".humidity");
    humidity.innerHTML= response.data.temperature.humidity;
    let wind = document.querySelector(".wind");
    wind.innerHTML= response.data.wind.speed;
    let date = new Date(response.data.time * 1000); //this is how we get date from the api
    let currentTime = document.querySelector(".current-time");
    currentTime.innerHTML = formatDate(date);
    let icon = document.querySelector("#icon");
    icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    getForecast(response.data.city);
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
      minutes = "0" + minutes;
    }
  
    return (day + " " + hours + ":" + minutes);
  }
function searchCity(city) {
    let apiUrl ="https://api.shecodes.io/weather/v1/current?query=" + city + "&key=4bcbfca0e1o5tdbbcae5faa393683b0c&units=metric";
    let apiKey = "4bcbfca0e1o5tdbbcae5faa393683b0c";
    axios.get(apiUrl).then(displayTemperature);
}
function showCity(event) {
  event.preventDefault();
  let revealCity = document.querySelector("#city-input"); //id here is id input type search
  searchCity(revealCity.value);
}

function getForecast(city) {

  let apiUrl ="https://api.shecodes.io/weather/v1/forecast?query=" + city + "&key=4bcbfca0e1o5tdbbcae5faa393683b0c&units=metric";
  let apiKey = "4bcbfca0e1o5tdbbcae5faa393683b0c";
  axios.get(apiUrl).then(displayForecast);
  
}

let city = document.querySelector("#submit-form"); //id here must be form id
city.addEventListener("submit", showCity);


searchCity("Lisbon"); //when i do this i want to see the weather in Lisbon as default everytime i refresh the page

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }

  displayForecast();
  
