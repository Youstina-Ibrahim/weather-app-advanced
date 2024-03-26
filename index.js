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


let city = document.querySelector("#submit-form"); //id here must be form id
city.addEventListener("submit", showCity);


searchCity("Lisbon"); //when i do this i want to see the weather in Lisbon as default everytime i refresh the page

