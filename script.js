const apiKey = "f6251cd3499fac55e20f35c783954d14";

const weatherDataEle = document.querySelector("#weather-data");
const cityNameEle = document.querySelector("#city-input");
const formEle = document.querySelector("form");

formEle.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityNameEle.value.trim();
    if (cityValue === "") {
        alert("Please enter a city name");
        return;
    }
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        updateWeatherUI(data);
    } catch (err) {
        console.error("Error fetching weather data:", err);
        alert("Could not fetch weather data. Please try again.");
    }
}

function updateWeatherUI(data) {
    const { main, weather, wind } = data;

    weatherDataEle.innerHTML = `
        <div class="icon">
            <img src="http://openweathermap.org/img/wn/${weather[0].icon}.png" alt="Weather Icon">
        </div>
        <div class="temperature">${Math.round(main.temp)}°C</div>
        <div class="description">${weather[0].description}</div>
        <div class="details">
            <div>Feels like: ${Math.round(main.feels_like)}°C</div>
            <div>Humidity: ${main.humidity}%</div>
            <div>Wind speed: ${wind.speed} m/s</div>
        </div>
    `;
}
