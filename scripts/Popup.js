export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    // this._openedPopup = this._popup.querySelector('.popup_opened')
    this._popupCloseBtn = this._popup.querySelectorAll('.popup__close-icon')
    // this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose());
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose());
  }

  _handleEscClose(e) {
    if (e.key == 'Escape') {
      close(this._popup);
    }
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener('click', () => {
      close(this._popup);
    })

    this._popup.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        close(this._popup);
      };
    })
  }
}
