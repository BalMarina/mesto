export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name
    this._pic = data.pic
    this._templateSelector = templateSelector;
    this._popupPhoto = document.querySelector('.popup-pic')
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _likeElement() {
    this._elementLikeButton.classList.toggle('element__like_active')
  };

  _delElement() {
    this._element.remove()
    this._element = null
  };

  _setEventListeners() {
    this._delButton.addEventListener('click', () => {
      this._delElement()
    })
    this._elementLikeButton.addEventListener('click', () => {
      this._likeElement()
    })
    this._img.addEventListener('click', (e) => {
      this._handleCardClick(e)
    })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._element.querySelector('.element__name').textContent = this._name
    this._img = this._element.querySelector('.element__pic')
    this._img.src = this._pic
    this._img.alt = this._name
    this._elementLikeButton = this._element.querySelector('.element__like')
    this._delButton = this._element.querySelector('.element__trash-button')
    this._setEventListeners()
    return this._element
  }
}
