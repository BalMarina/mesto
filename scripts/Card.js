import { openPopup } from './utils.js'

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name
    this._pic = data.pic
    this._templateSelector = templateSelector;
    this._popupPhoto = document.querySelector('.popup-pic')
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

  _openPhoto() {
    document.querySelector('.popup-pic .popup-pic__alt').textContent = this._name
    const imgPopup = document.querySelector('.popup-pic__photo')
    imgPopup.src = this._pic
    imgPopup.setAttribute("alt", this._name)
    imgPopup.onload = () => {
      openPopup(this._popupPhoto);
    };
  };

  _setEventListeners() {
    this._delButton.addEventListener('click', () => {
      this._delElement()
    })
    this._elementLikeButton.addEventListener('click', () => {
      this._likeElement()
    })
    this._img.addEventListener('click', (e) => {
      this._openPhoto(e)
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
