let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let h2 = document.querySelector("h2");
h2.innerHTML = `${date}, ${day}, ${hours}:${minutes}`;
if (minutes <10) {
  minutes =`0${minutes}`;
}
if (hours <10) {
  hours =`0${hours}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  console.log(searchInput.value);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchSubmit);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let h3 = document.querySelector("#temp");
  h3.innerHTML = Math.round(celsiusTemperature)

}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let h3 = document.querySelector("#temp");
  let fahrenheitTemperature = (celsiusTemperature * (9 / 5) + 32);
  h3.innerHTML = Math.round(fahrenheitTemperature);

}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);


let celsiusTemperature = null;

function searchCity(city) {
  let apiKey = "baf56f4471be4826660e97693ea45c45";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}


function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = document.querySelector("h3");
  city.innerHTML = temperature;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
     let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity =document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "baf56f4471be4826660e97693ea45c45";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);
