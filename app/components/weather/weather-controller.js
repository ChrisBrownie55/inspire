import WeatherService from './weather-service.js';

var weatherService = new WeatherService();

const weatherContainer = document.getElementById('weather');
const fahrenheitInput = document.getElementById('fahrenheit');

async function updateWeather() {
  const {
    name,
    main: { temp },
    weather: [{ icon: weatherIcon }]
  } = await weatherService.getWeather();
  const weatherIconClass = weatherService.getIcon(weatherIcon);

  const isFahrenheit = document.getElementById('fahrenheit').checked;
  const convertedTemp = (isFahrenheit
    ? temp * 1.8 - 459.67
    : temp - 273.15).toFixed(2);

  weatherContainer.innerHTML = `
		<i class='wi ${weatherIconClass}'></i>
		<div class='weather-container'>
      <h4 class='temperature'>
        <span id='temperature'>
          ${parseFloat(convertedTemp)}
        </span>
        °
        <span id='temperature-letter'>
          ${isFahrenheit ? 'F' : 'C'}
        </span>
      </h4>
			<h4 class='location'>${name}</h>
		</div>`;
}

export default class WeatherController {
  constructor() {
    this.getWeather();
  }

  toggleFahrenheit() {
    const temperatureElement = document.getElementById('temperature');
    const temperatureLetterElement = document.getElementById(
      'temperature-letter'
    );
    const temperature = parseFloat(temperatureElement.textContent);

    temperatureElement.textContent = parseFloat(
      (fahrenheitInput.checked
        ? temperature * 1.8 + 32
        : (temperature - 32) / 1.8).toFixed(2)
    );

    temperatureLetterElement.textContent = fahrenheitInput.checked ? 'F' : 'C';
  }

  getWeather() {
    updateWeather();
  }
}
