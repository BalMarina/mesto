import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._photoForPopupWithImage = this._popup.querySelector('.popup-pic__photo')
    this._nameForPopupWithImage = this._popup.querySelector('.popup-pic .popup-pic__alt')
  }

  open({ name, pic }) {
    this._photoForPopupWithImage.setAttribute('src', pic)
    this._nameForPopupWithImage.textContent = name
    this._photoForPopupWithImage.setAttribute("alt", name)
    super.open()
  }
}
