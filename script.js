//WEATHER APP
import API_KEY from './config.js';

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.getElementById("cityInput");
const card = document.querySelector(".weatherCard");


weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
        const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData);
        } 
        catch (error){
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city");
    }

});

async function getWeatherData(city){
   const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

   const response = await fetch(apiURL);

   if(!response.ok){
    throw new Error("Unable to fetch weather data");
   }

   return await response.json();
}

function displayWeatherInfo(data){
    console.log(data);

    const { name: city, main: { temp, humidity }, weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";
    card.className = "weatherCard";
    card.classList.add(getConditionClass(id));

    const cityDisplay = document.createElement("p");
    cityDisplay.textContent = city;
    cityDisplay.classList.add("city-name");
    
    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    tempDisplay.classList.add("city-temperature");

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `Humidity: ${humidity}% - ${description}`;
    humidityDisplay.classList.add("city-humidity");

    const emojiDisplay = document.createElement("p");
    emojiDisplay.textContent = getWeatherEmoji(id);
    emojiDisplay.classList.add("weather-emoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(emojiDisplay);
}
    
function getWeatherEmoji(weatherId){
    switch(true){
        case weatherId >= 200 && weatherId < 300: return "⛈️";
        case weatherId >= 300 && weatherId < 400: return "🌦️";
        case weatherId >= 500 && weatherId < 600: return "🌧️";
        case weatherId >= 600 && weatherId < 700: return "❄️";
        case weatherId >= 700 && weatherId < 800: return "🌫️";
        case weatherId === 800: return "☀️";
        case weatherId >= 800 && weatherId < 810: return "☁️";
        default: return "🌡️";

    }

}

function getConditionClass(weatherId){
    switch(true) {
        case weatherId >= 200 && weatherId < 300: return "stormy";
        case weatherId >= 300 && weatherId < 600: return "rainy";
        case weatherId >= 600 && weatherId < 700: return "snowy";
        case weatherId >= 700 && weatherId < 800: return "cloudy";
        case weatherId === 800: return "sunny";
        case weatherId > 800 && weatherId < 810: return "cloudy";
        default: return "sunny";
    }
}

function displayError(message){
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("errorMessage");

    card.textContent = "";
    card.className = "weatherCard";
    card.style.display = "flex";
    card.appendChild(errorMessage);
}