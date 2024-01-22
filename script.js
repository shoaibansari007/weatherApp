"use strict";

//--------------------------- Target Elements ------------------------------

const apiKey = "2f217739448d497154f380919420d1b8";
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search-button");
const dataBox = document.querySelector(".data-box");
const error = document.querySelector(".error");
const weatherIcon = document.querySelector(".weather-icon");

//--------------------------- Api Fething ----------------------------------
const getWeather = async function (inputCity) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inputCity}&appid=` +
      apiKey
  );
  const data = await response.json();

  //--------------------------- Update Data to DOM -------------------------

  if (data.cod == 404) {
    error.classList.remove("hidden");
    dataBox.classList.add("hidden");
  } else {
    temp.innerHTML = Math.round(data.main.temp) + "°C";
    city.innerHTML = data.name;
    wind.innerHTML = data.wind.speed + " Km/H";
    humidity.innerHTML = data.main.humidity + " %";
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "img/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "img/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "img/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "img/mist.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "img/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "img/snow.png";
    }
    dataBox.classList.remove("hidden");
    error.classList.add("hidden");
  }
};
//--------------------------- Search Event ----------------------------------

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getWeather(search.value);
});
