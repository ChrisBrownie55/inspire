import QuoteService from './quote-service.js';

let qs = new QuoteService();

const quoteContainer = document.getElementById('quote');

const truncate = (string, length) =>
  string.length > length ? string.slice(0, length - 3) + '...' : string;

function convertHtmlEntityToString(html) {
  const domNode = document.createElement('div');
  domNode.innerHTML = html;
  return domNode.textContent;
}

function draw(quoteData) {
  quoteContainer.innerHTML = `"${truncate(quoteData.quote, 100)}"`;
  quoteContainer.setAttribute('data-author', quoteData.author);

  quoteContainer.setAttribute(
    'title',
    convertHtmlEntityToString(quoteData.quote)
  );
}

export default class QuoteController {
  constructor() {
    this.getQuote();
  }

  async getQuote() {
    draw(await qs.getQuote());
  }
}
