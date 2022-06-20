export class Card {
  constructor(data, templateSelector, handleCardClick, handleLike, handleDelete, userInfo) {
    this.updateCard(data)
    this._templateSelector = templateSelector;
    this._popupPhoto = document.querySelector('.popup-pic')

    this._handleCardClick = handleCardClick
    this._handleLike = handleLike
    this._handleDelete = handleDelete

    this._userInfo = userInfo

  }

  updateCard(data) {
    this._name = data.name
    this._pic = data.pic
    this._likes = data.likes;
    this._idOwner = data.owner._id;
    this._cardId = data._id;
  }

  _hasMyLike() {
    return this._likes.some(v => v._id === this._userInfo.id)
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  likeElement() {
    this._handleLike(this._cardId, this._hasMyLike())
      .then(cardResponse => {
        this.updateCard(cardResponse)
        this._renderLike()
      })
  };

  _renderLike() {
    this._element.querySelector('.element__likes-counter').textContent = this._likes.length;
    if (this._hasMyLike()) {
      this._elementLikeButton.classList.add('element__like_active')
    } else {
      this._elementLikeButton.classList.remove('element__like_active')
    }
  }

  _delElement() {
    this._element.remove()
    this._element = null
  };

  _setEventListeners() {
    this._delButton.addEventListener('click', () => {
      this._handleDelete(this)
    })
    this._elementLikeButton.addEventListener('click', () => {
      this.likeElement()
    })
    this._img.addEventListener('click', () => {
      this._handleCardClick(this._name, this._pic)
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
    if (this._userInfo.id !== this._idOwner) {
      this._delButton.remove();
    }
    this._setEventListeners()
    this._renderLike()
    return this._element
  }
}
