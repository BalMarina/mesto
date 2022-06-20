import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, form) {
    super(popupSelector)
    this._form = form
  }


  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      this._handler()
    })
  }

  setHandler(callback) {
    this._handler = callback
  }
}
