//WEATHER APP
import API_KEY from './config.js';

fetch(`https://api.example.com/weather?key=${API_KEY}`)

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const weatherCard = document.querySelector(".weatherCard");
const apiKey = "";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if(city){
        try{
        const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData);
        } catch (error){
            console.error(error);
            displayError(error.message);
        }
    } else {
        displayError("Please enter a city");
    }

});

async function getWeatherData(city){
    const response = await fetch(
        '`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`'
    )
    if (!response.ok){
        throw new Error("City not found");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    const { name: city, main: { temp, humidity }, weather: [{description, id}]} = data;

    weatherCard.textContent = "";
    weatherCard.style.display = "flex";
    weatherCard.className = "weatherCard";
    weatherCard.classList.add(getConditionClass(id));

    const cityDisplay = document.createElement("p");
    cityDisplay.textContent = city;
    cityDisplay.classList.add("city-name");
    
    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = `${Math.round(temp)}°C`;
    tempDisplay.classList.add("city-temperature");

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `Humidity: ${humidity}% - ${description}`;
    humidityDisplay.classList.add("city-humidity");

    const emojiDisplay = document.createElement("p");
    emojiDisplay.textContent = getWeatherEmoji(id);
    emojiDisplay.classList.add("weather-emoji");

    weatherCard.appendChild(cityDisplay);
    weatherCard.appendChild(tempDisplay);
    weatherCard.appendChild(humidityDisplay);
    weatherCard.appendChild(emojiDisplay);
}
    
function getWeatherEmoji(weatherId){
    switch(true){
        case weatherId >= 200 && weatherid < 300: return "⛈️";
        case weatherId >= 300 && weatherid < 400: return "🌦️";
        case weatherId >= 500 && weatherid < 600: return "🌧️";
        case weatherId >= 600 && weatherid < 700: return "❄️";
        case weatherId >= 700 && weatherid < 800: return "🌫️";
        case weatherId === 800: return "☀️";
        case weatherId >= 800 && weatherid < 810: return "☁️";
        default: return "🌡️";

    }

}

function getConditionClass(weatherId){
    switch(true) {
        case weatherId >= 200 && weatherId < 600: return "rainy";
        case weatherId === 800: return "sunny";
        default: return "sunny";
    }
}

function displayError(message){
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("errorMessage");

    weatherCard.textContent = "";
    weatherCard.className = "weatherCard";
    weatherCard.style.display = "flex";
    weatherCard.appendChild(errorMessage);
}