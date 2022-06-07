export default class Section {
  constructor({ data, renderer }, selector) {
    this._renderedItems = data;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems(item) {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  addItem(element, prepend = false) {
    if (prepend === true) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
