let url = '//bcw-getter.herokuapp.com/?url=';
let url2 = 'http://quotesondesign.com/api/3.0/api-3.0.json';
let apiUrl = url + encodeURIComponent(url2);
//Do Not Edit above we have to go through the bcw-getter to access this api

const quoteApi = axios.create({
  baseURL: apiUrl,
  timeout: 3000
});

export default class QuoteService {
  getQuote() {
    return quoteApi().then(
      res => (console.log('getQuote:', res.data), res.data)
    );
  }
}
