const showInputError = (formElement, inputElement, errorMessage, configs) => {
  const inputError = formElement.querySelector(`.${inputElement.id}_type_error`);
  inputElement.classList.add(configs.inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(configs.errorClass)
};

const hideInputError = (formElement, inputElement, configs) => {
  const inputError = formElement.querySelector(`.${inputElement.id}_type_error`);
  inputElement.classList.remove(configs.inputErrorClass);
  inputError.classList.remove(configs.errorClass);
  inputError.textContent = '';
};

const checkValid = (formElement, inputElement, configs) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, configs);
  } else {
    hideInputError(formElement, inputElement, configs);
  }
};

const hasInvalidInput = function (inputSelectorList) {
  return inputSelectorList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputSelectorList, submitButtonSelector, configs) => {
  if (hasInvalidInput(inputSelectorList)) {
    submitButtonSelector.classList.add(configs.inactiveButtonClass);
  } else {
    submitButtonSelector.classList.remove(configs.inactiveButtonClass);
    submitButtonSelector.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, configs) => {
  const inputSelector = formElement.querySelectorAll(configs.inputSelector);
  const inputSelectorList = Array.from(inputSelector);
  const submitButtonSelector = formElement.querySelector(configs.submitButtonSelector);
  toggleButtonState(inputSelectorList, submitButtonSelector, configs);
  inputSelectorList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkValid(formElement, inputElement, configs);
      toggleButtonState(inputSelectorList, submitButtonSelector, configs);
    });
  });
};

function enableValidation(configs) {
  const formSelector = document.querySelectorAll(configs.formSelector)
  formSelector.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, configs);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

