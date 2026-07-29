//WEATHER APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const weatherCard = document.querySelector(".weatherCard");
const apiKey = "";

weatherForm.addEventListener("submit", event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){

    } else {
        displayError("Please enter a city");
    }

});

async function getWeatherData(city){


}

function displayWeatherInfo(data){

}

function getWeatherEmoji(weatherId){

}

function displayError(message){
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("errorMessage");

    weatherCard.textContent = "";
    weatherCard.style.display = "flex";
    weatherCard.appendChild(errorMessage);
}