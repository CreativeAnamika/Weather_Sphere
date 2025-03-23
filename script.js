// script.js

// Get references to the HTML elements
const cityInput = document.getElementById("city");
const getWeatherButton = document.getElementById("getWeather");
const weatherResult = document.getElementById("weatherResult");

// Your OpenWeatherMap API key
const apiKey = "1729065a9abf0fccc0f4ccbfc8bcc600";


    
  


// Function to get weather data
async function getWeather() {
    const city = cityInput.value.trim();
    if (city === "") {
        weatherResult.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    // API URL for OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        // Fetch the weather data
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            weatherResult.innerHTML = "<p>City not found, please try again.</p>";
        } else {
            // Extracting data
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const cityName = data.name;
            const country = data.sys.country;

            // Display weather data
            weatherResult.innerHTML = `
                <h2>Weather in ${cityName}, ${country}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${weatherDescription}</p>
            `;
        }
    } catch (error) {
        weatherResult.innerHTML = "<p>Failed to fetch weather data. Please try again.</p>";
    }
}

// Add event listener to the button
getWeatherButton.addEventListener("click", getWeather);
