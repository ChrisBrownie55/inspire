import WeatherController from './components/weather/weather-controller.js';
import TodoController from './components/todo/todo-controller.js';
import QuoteController from './components/quote/quote-controller.js';
import ImageController from './components/image/image-controller.js';
import './components/toast-message.js';

const getTimeOfDay = hour =>
  hour < 12 ? 'morning' : hour < 12 + 5 ? 'afternoon' : 'evening';

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

    document.getElementById('blur').checked =
      localStorage.getItem('blur') === 'true';
    this.controllers.image.setBlur(document.getElementById('blur').checked);

    this.updateTime = this.updateTime.bind(this);
    this.updateTime();

    setInterval(this.updateTime, 5000);
    this.addTodo = document.getElementById('add-todo');

    this.updateGreeting = this.updateGreeting.bind(this);
  }

  updateGreeting(hour) {
    const greeting = getTimeOfDay(hour);
    if (greeting !== this.currentTimeOfDay) {
      document.getElementById('time-of-day').textContent = greeting;
    }
  }

  updateTime() {
    const toAmPm = hour24 =>
      hour24 >= 12
        ? [hour24 === 12 ? hour24 : hour24 - 12, 'PM']
        : [hour24 === 0 ? 12 : hour24, 'AM'];

    const padTime = time => (time < 10 ? `0${time}` : time.toString());

    const now = new Date();
    const hours = now.getHours();
    this.updateGreeting(hours);
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
    this.controllers.weather.toggleFahrenheit();
  }
  toggleTimeFormat({ checked }) {
    localStorage.setItem('24hr', checked);
    this.updateTime();
  }
  toggleBlur({ checked }) {
    localStorage.setItem('blur', checked);
    this.controllers.image.setBlur(checked);
  }
}

window.app = new App();
