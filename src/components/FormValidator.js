export class FormValidator {
  constructor(configs, currentForm) {
    this._configs = configs
    this._currentForm = currentForm
    this._inputs = this._currentForm.querySelectorAll(this._configs.inputs)
    this._inputsList = Array.from(this._inputs);
    this._submitButton = this._currentForm.querySelector(this._configs.submitButton)
    this._inactiveButtonClass = this._configs.inactiveButtonClass
    this._inputErrorClass = this._configs.inputErrorClass
    this._errorClass = this._configs.errorClass
  }
  _showInputError(inputElement, errorMessage) {
    const inputError = this._currentForm.querySelector(`#${inputElement.id}_type_error`)
    inputElement.classList.add(this._inputErrorClass)
    inputError.textContent = errorMessage
    inputError.classList.add(this._configs.errorClass)
  }

  _hideInputError(inputElement) {
    const inputError = this._currentForm.querySelector(`#${inputElement.id}_type_error`)
    inputElement.classList.remove(this._inputErrorClass)
    inputError.classList.remove(this._errorClass)
    inputError.textContent = ''
  }

  _checkValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _hasInvalidInput() {
    return this._inputsList.some(function (inputElement) {
      return !inputElement.validity.valid
    })
  }

  _deactivateSubmitButton() {
    this._submitButton.setAttribute('disabled', 'disabled')
    this._submitButton.classList.add(this._inactiveButtonClass)
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputsList)) {
      this._deactivateSubmitButton()
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass)
      this._submitButton.removeAttribute('disabled')
    }
  }

  resetErrors() {
    this._inputs.forEach(inputElement => {
      this._hideInputError(inputElement)
    })
    this._toggleButtonState()
  }

  _setEventListeners() {
    this._currentForm.addEventListener('submit', (e) => {
      e.preventDefault()
    });

    this._toggleButtonState()
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValid(inputElement)
        this._toggleButtonState()
      })
    })

    // this._currentForm.addEventListener('reset', () => {
    //   this.resetErrors()
    //   this._deactivateSubmitButton()
    // })
  };

  enableValidation() {
    this._setEventListeners()
  }
}


