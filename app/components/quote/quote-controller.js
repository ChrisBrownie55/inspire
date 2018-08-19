import QuoteService from './quote-service.js';

let qs = new QuoteService();

const quoteContainer = document.getElementById('quote');

const truncate = (string, length) =>
  string.length > length ? string.slice(0, length - 3) + '...' : string;

const removeTags = htmlString => htmlString.replace(/<[/]?.+?>/g, '');

function convertHtmlEntityToString(html) {
  const domNode = document.createElement('div');
  domNode.innerHTML = html;
  return domNode.textContent;
}

function draw([{ content, title }]) {
  content = removeTags(content).trim();
  quoteContainer.innerHTML = `"${truncate(content, 100)}"`;
  quoteContainer.setAttribute('data-author', title);

  quoteContainer.setAttribute(
    'title', // tooltip
    convertHtmlEntityToString(content)
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
