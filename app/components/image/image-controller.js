import ImageService from './image-service.js';

const imageService = new ImageService();

const backgroundImageContainer = document.getElementById(
  'background-image-container'
);

function removeAllChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function draw(imageData) {
  const image = new Image();
  const hdImage = new Image();

  image.onload = () => {
    removeAllChildren(backgroundImageContainer);
    backgroundImageContainer.appendChild(image);
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
}
