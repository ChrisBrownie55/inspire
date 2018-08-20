import ImageService from './image-service.js';

const imageService = new ImageService();

const backgroundImageContainer = document.getElementById(
  'background-image-container'
);
const app = document.getElementById('app');

function removeAllChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function draw(imageData) {
  app.classList.add('loading');
  if (!imageData) {
    return app.classList.remove('loading');
  }
  const image = new Image();
  const hdImage = new Image();

  image.onload = () => {
    removeAllChildren(backgroundImageContainer);
    backgroundImageContainer.appendChild(image);
    app.classList.remove('loading');
  };
  image.src = imageData.url;

  hdImage.onload = () => {
    delete image.onload;
    removeAllChildren(backgroundImageContainer);
    backgroundImageContainer.appendChild(hdImage);
  };
  hdImage.src = imageData.large_url;
}

export default class ImageController {
  constructor() {
    this.getImage();
  }

  async getImage() {
    draw(await imageService.getImage());
  }

  setBlur(on) {
    const imageContainer = document.getElementById(
      'background-image-container'
    );
    if (on) {
      return imageContainer.classList.add('blur');
    }
    return imageContainer.classList.remove('blur');
  }

  setBrightness(value) {
    const imageContainer = document.getElementById(
      'background-image-container'
    );
    imageContainer.style.setProperty('--brightness', value);
  }
}
