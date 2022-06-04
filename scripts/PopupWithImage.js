import Popup from '.Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._photoForPopupWithImage = document.querySelector('.popup-pic__photo')
    this._nameForPopupWithImage = document.querySelector('.popup-pic .popup-pic__alt')
  }

  open({ name, src }) {
    this._photoForPopupWithImage.setAttribute('src', src)
    this._nameForPopupWithImage.textContent = name
    this._photoForPopupWithImage.setAttribute("alt", name)
    super.open()
  }
}
