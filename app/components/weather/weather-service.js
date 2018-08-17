const url = '//bcw-getter.herokuapp.com/?url=';
const url2 =
  'http://api.openweathermap.org/data/2.5/weather?q=boise&&APPID=bd82255fd0a21fa1238699b9eda2ee35';
const apiUrl = url + encodeURIComponent(url2);

const weatherApi = axios.create({
  baseURL: apiUrl,
  timeout: 3000
});

const wiIcons = {
  '01d': 'wi-day-sunny',
  '01n': 'wi-night-clear',
  '02d': 'wi-day-sunny-overcast',
  '02n': 'wi-night-alt-partly-cloudy',
  '03d': 'wi-day-cloudy',
  '03n': 'wi-night-alt-cloudy',
  '04d': 'wi-day-cloudy-high',
  '04n': 'wi-night-alt-cloudy-high',
  '09d': 'wi-day-sprinkle',
  '09n': 'wi-night-alt-sprinkle',
  '10d': 'wi-day-rain',
  '10n': 'wi-night-alt-rain',
  '11d': 'wi-day-thunderstorm',
  '11n': 'wi-night-alt-thunderstorm',
  '13d': 'wi-day-snow',
  '13n': 'wi-night-alt-snow',
  '50d': 'wi-day-fog',
  '50n': 'wi-night-fog'
};

export default class WeatherService {
  getIcon(iconText) {
    return wiIcons[iconText];
  }

  getWeather() {
    const weather = localStorage.getItem('weather');
    const halfHourInMilliseconds = (1000 * 60 * 60) / 2;
    if (
      weather &&
      weather.time &&
      Date.now() - weather.time < halfHourInMilliseconds
    ) {
      return weather.data;
    }

    return weatherApi().then(res => {
      localStorage.setItem(
        'weather',
        JSON.stringify({
          data: res.data,
          time: Date.now()
        })
      );

      return res.data;
    });
  }
}
