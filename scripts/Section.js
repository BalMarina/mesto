export default class Section {
  constructor({ item, renderer }, selector) {
    this._renderedItems = item;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems(item) {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  addItem(element) {
    this._container.append(element);
  }
}
