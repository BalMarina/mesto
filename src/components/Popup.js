export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._popupCloseBtn = this._popup.querySelector('.popup__close-icon')
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open(e) {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close(e) {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key == 'Escape') {
      this.close(e);
    }
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener('click', (e) => {
      this.close(e);
    })

    this._popup.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.close(e);
      };
    })
  }
}
