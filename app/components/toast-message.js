class ToastMessage extends HTMLElement {
  constructor() {
    super();

    setTimeout(this.close.bind(this), 2000);
  }

  close() {
    this.setAttribute('closing', true);
    this.addEventListener('animationend', this.destroy.bind(this));
  }

  destroy() {
    this.parentNode.removeChild(this);
  }
}

window.customElements.define('toast-message', ToastMessage);
