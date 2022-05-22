import { popupPhoto, closePopup, openPopup, openPhoto, popupCard } from './utils.js'

export class Card {
  constructor(data, template) {
    this._name = data.name
    this._pic = data.pic
    this._template = template;
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

  // _generateCardAfterSubmit() {
  //   this._name = document.querySelector('#card-name').textContent
  //   this._pic = document.querySelector('#card-pic').style.backgroundImage
  //   document.querySelector('.elements').prepend(this._name, this._pic)
  // }

  _setEventListeners() {
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._delElement()
    })
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeElement()
    })
    this._element.querySelector('.element__pic').addEventListener('click', (e) => {
      openPopup(popupPhoto)
      openPhoto(e)
    })
  }


  // _handleSubmitCard(e) {
  //   e.preventDefault();
  //   popupCard.querySelector('.popup__submit').setAttribute('disabled', 'disabled');
  //   popupCard.querySelector('.popup__submit').classList.add('popup__submit_disabled');
  // };

  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners()
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__pic').src = this._pic;

    //   const resultCreateTemplate = createCard(cardNameInput.value, cardPicInput.value);
    //   elementsContainer.prepend(resultCreateTemplate);
    closePopup(popupCard)
    document.querySelector('.popup__submit').setAttribute('disabled', 'disabled');
    document.querySelector('.popup__submit').classList.add('popup__submit_disabled');
    return this._element;
  }
}
