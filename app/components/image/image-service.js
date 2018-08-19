const url = '//bcw-getter.herokuapp.com/?url=';
const url2 = 'http://www.splashbase.co/api/v1/images/search?query=city';
const apiUrl = url + encodeURIComponent(url2);

const imgApi = axios.create({
  baseURL: apiUrl,
  timeout: 3000
});
const images = [];

const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];

export default class ImageService {
  constructor() {
    this.retryCount = 0;
    this.retryMax = 5;
  }

  getImage() {
    if (images.length > 0) {
      return getRandomItem(images);
    }
    return imgApi()
      .then(res => {
        images.push(...res.data.images);
        return getRandomItem(images);
      })
      .catch(error => {
        console.error(error);
        if (++this.retryCount > this.retryMax) {
          document.getElementById(
            'toasts'
          ).innerHTML += `<toast-message>Unable to load background image.</toast-message>`;
          return (this.retryCount = 0);
        }
        return this.getImage();
      });
  }
}
