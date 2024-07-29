const apiKey = "3abco04ca31bfb3f945d43b92btd3f1c";

async function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;

  const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function displayWeather(data) {
  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = `
        <h2>Weather in ${data.city}</h2>
        <p>Temperature: ${data.temperature.current} °C</p>
        <p>Condition: ${data.condition.description}</p>
        <p>Humidity: ${data.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
