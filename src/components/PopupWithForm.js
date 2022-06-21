import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._form = this._popup.querySelector(".popup__form")
    this._submit = this._popup.querySelector(".popup__submit")
  }

  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'))
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues
  }

  renderLoading(isRestore = false) {
    if (isRestore) {
      if (this._defaultText) {
        this._submit.textContent = this._defaultText
      }
    } else {
      this._defaultText = this._submit.textContent
      this._submit.textContent = 'Сохранение...'
    }
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.renderLoading()
      this._handleFormSubmit(this._getInputValues())
    })
  }

  close() {
    this._form.reset();
    super.close();
  }
}
