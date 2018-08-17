import WeatherController from './components/weather/weather-controller.js';
import TodoController from './components/todo/todo-controller.js';
import QuoteController from './components/quote/quote-controller.js';
import ImageController from './components/image/image-controller.js';

// HEY WHERE ARE ALL OF YOUR CONTROLLERS??
class App {
  constructor() {
    this.controllers = {
      weather: new WeatherController(),
      todos: new TodoController(),
      quote: new QuoteController(),
      image: new ImageController()
    };
    this.timeFormatElement = document.getElementById('24hr');
    this.timeElement = document.getElementById('time');

    document.getElementById('name').textContent =
      localStorage.getItem('name') || 'YOUR NAME';

    document.getElementById('fahrenheit').checked =
      localStorage.getItem('fahrenheit') === 'true';

    document.getElementById('24hr').checked =
      localStorage.getItem('24hr') === 'true';

    this.updateTime = this.updateTime.bind(this);
    this.updateTime();

    setInterval(this.updateTime, 5000);
  }

  updateTime() {
    const toAmPm = hour24 =>
      hour24 >= 12
        ? [hour24 === 12 ? hour24 : hour24 - 12, 'PM']
        : [hour24 === 0 ? 12 : hour24, 'AM'];

    const padTime = time => (time < 10 ? `0${time}` : time.toString());

    const now = new Date();
    const hours = now.getHours();
    const minutes = padTime(now.getMinutes());

    this.timeElement.textContent = this.timeFormatElement.checked
      ? `${hours}:${minutes}`
      : toAmPm(hours).join(`:${minutes} `);
  }

  saveName(name) {
    localStorage.setItem('name', name);
  }

  toggleFahrenheit({ checked }) {
    localStorage.setItem('fahrenheit', checked);
    this.controllers.weather.getWeather();
  }
  toggleTimeFormat({ checked }) {
    localStorage.setItem('24hr', checked);
    this.updateTime();
  }
}

window.app = new App();
