import { configs } from './utils.js'

export class FormValidator {
  constructor(configs, currentForm) {
    this._configs = configs
    this._currentForm = currentForm
    this._inputs = this._currentForm.querySelectorAll(this._configs.inputs)
    this._submitButton = this._currentForm.querySelector(this._configs.submitButton)
    this._inactiveButtonClass = this._configs.inactiveButtonClass
    this._inputErrorClass = this._configs.inputErrorClass
    this._errorClass = this._configs.errorClass
  }
  _showInputError(inputElement, errorMessage) {
    const inputError = this._currentForm.querySelector(`#${inputElement.id}_type_error`);
    inputElement.classList.add(this._inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(this._configs.errorClass)
  }

  _hideInputError(inputElement) {
    const inputError = this._currentForm.querySelector(`#${inputElement.id}_type_error`);
    inputElement.classList.remove(this._inputErrorClass);
    inputError.classList.remove(this._errorClass);
    inputError.textContent = '';
  };

  _checkValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputsList) {
    return inputsList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputsList) {
    if (this._hasInvalidInput(inputsList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    };
  };

  _resetErrors() {
    this._inputs.forEach(inputElement => {
      this._hideInputError(inputElement)
    })
  }

  _setEventListeners() {
    const inputsList = Array.from(this._inputs);
    this._toggleButtonState(inputsList, this._submitButton);
    inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValid(inputElement);
        this._toggleButtonState(inputsList, this._submitButton);
      });
    });
    this._currentForm.addEventListener('reset', () => {
      this._resetErrors()
    })
  };

  enableValidation() {
    this._currentForm.addEventListener('submit', function (e) {
      e.preventDefault();
    });
    this._setEventListeners()
  }
}


