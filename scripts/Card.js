import { closePopup, openPopup, popupCard } from './utils.js'

export class Card {
  constructor(data, template) {
    this._name = data.name
    this._pic = data.pic
    this._template = template;
    this._popupPhoto = document.querySelector('.popup-pic');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _likeElement() {
    this._element
      .querySelector('.element__like')
      .classList
      .toggle('element__like_active')
  };

  _delElement() {
    this._element.remove()
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
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._delElement()
    })
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeElement()
    })
    this._element.querySelector('.element__pic').addEventListener('click', (e) => {
      this._openPhoto(e)
    })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners()
    this._element.querySelector('.element__name').textContent = this._name
    const img = this._element.querySelector('.element__pic')
    img.src = this._pic
    img.alt = this._name
    closePopup(popupCard)
    return this._element
  }
}
