const apiKey = "78d1b1528ffe272d65fff5330dd6942e";
const searchButton = document.querySelector(".iconSearch");
const searchInput = document.getElementById("input");

const weatherIcon = document.querySelector(".weatherIcon");
const temperatureElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});

async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("City not found!");
        }
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateWeather(data) {
    const { main, wind, weather, name } = data;
    const { temp, humidity } = main;
    const { speed } = wind;
    const weatherCondition = weather[0].main.trim().toLowerCase();  
    console.log("Weather data:", data); 
    console.log("Weather condition:", weatherCondition); 

    temperatureElement.textContent = `${Math.round(temp)}°C`;
    cityElement.textContent = name;
    humidityElement.textContent = `${humidity}%`;
    windElement.textContent = `${speed} km/h`;
    
    if (weatherCondition === "clear") {
        weatherIcon.src = "./sun.png";
    } else if (weatherCondition === "clouds") {
        weatherIcon.src = "./clouds.png";
    } else if (weatherCondition === "rain") {
        weatherIcon.src = "./cloudy.png";
    } else if (weatherCondition === "snow") {
        weatherIcon.src = "./snowy.png";
    } else if (weatherCondition === "thunderstorm") {
        weatherIcon.src = "./thunderstorm.png";
    } else {
        weatherIcon.src = "./sun.png";
    }
}
