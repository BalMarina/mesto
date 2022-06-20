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

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      this._preventText = this._submit.textContent
      this._submit.textContent = 'Сохранение...'
      this._handleFormSubmit(this._getInputValues())
    })
  }

  close(e) {
    this._form.reset();
    this._submit.textContent = this._preventText
    super.close(e);
  }
}
