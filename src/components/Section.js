export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems(data) {
    data.forEach(item => this._renderer(item))
  }

  addItem(element, prepend = false) {
    if (prepend === true) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
