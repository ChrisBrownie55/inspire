import WeatherService from './weather-service.js';

var weatherService = new WeatherService();

const weatherContainer = document.getElementById('weather');

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
    : temp - 273.15
  ).toFixed(2);

  weatherContainer.innerHTML = `
		<i class='wi ${weatherIconClass}'></i>
		<div class='flex flex-column'>
			<h4 class='temperature'>${convertedTemp} ${isFahrenheit ? 'F' : 'C'}</h4>
			<h4 class='location'>${name}</h>
		</div>`;
}

export default class WeatherController {
  constructor() {
    this.getWeather();
  }
  getWeather() {
    updateWeather();
  }
}
