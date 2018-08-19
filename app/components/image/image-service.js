const url = '//bcw-getter.herokuapp.com/?url=';
const url2 = 'http://www.splashbase.co/api/v1/images/search?query=city';
const apiUrl = url + encodeURIComponent(url2);

const imgApi = axios.create({
  baseURL: apiUrl,
  timeout: 3000
});

export default class ImageService {
  constructor() {
    this.retryCount = 0;
    this.retryMax = 5;
  }

  getImage() {
    return imgApi()
      .then(
        res =>
          res.data.images[Math.floor(Math.random() * res.data.images.length)]
      )
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
