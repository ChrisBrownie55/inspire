import QuoteService from './quote-service.js';

let qs = new QuoteService();

const quoteContainer = document.getElementById('quote');

function draw(quoteData) {
  quoteContainer.textContent = quoteData.quote;
  quoteContainer.setAttribute('data-author', quoteData.author);
}

export default class QuoteController {
  constructor() {
    this.getQuote();
  }

  async getQuote() {
    draw(await qs.getQuote());
  }
}
