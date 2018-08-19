const url = '//bcw-getter.herokuapp.com/?url=';
// let url2 = 'http://quotesondesign.com/api/3.0/api-3.0.json';
const url2 =
  'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
const apiUrl = url + encodeURIComponent(url2);
//Do Not Edit above we have to go through the bcw-getter to access this api

const quoteApi = axios.create({
  baseURL: apiUrl,
  timeout: 3000
});

export default class QuoteService {
  constructor() {
    this.retryCount = 0;
    this.retryMax = 5;
  }

  getQuote() {
    return quoteApi()
      .then(res => res.data)
      .catch(error => {
        console.error(error);
        if (++this.retryCount > this.retryMax) {
          document.getElementById(
            'toasts'
          ).innerHTML += `<toast-message>Unable to load quote.</toast-message>`;
          return (this.retryCount = 0);
        }
        return this.getQuote();
      });
  }
}
