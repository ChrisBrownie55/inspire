const url = '//bcw-getter.herokuapp.com/?url=';
const url2 =
  'http://www.splashbase.co/api/v1/images/search?query=city&commit=Search';
const apiUrl = url + encodeURIComponent(url2);

const imgApi = axios.create({
  baseURL: apiUrl,
  timeout: 3000
});

export default class ImageService {
  getImage() {
    return imgApi()
      .then(
        res => (
          console.log('getImage:', res.data),
          res.data.images[Math.floor(Math.random() * res.data.images.length)]
        )
      )
      .catch(error => (console.error(error), this.getImage()));
  }
}
