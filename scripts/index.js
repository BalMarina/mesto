import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { openPopup, closePopup } from './utils.js'

const initialCards = [
  {
    name: 'Нижний Новгород',
    pic: 'https://images.unsplash.com/photo-1638009270386-f5e0e5b29a6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Пенза',
    pic: 'https://images.unsplash.com/photo-1626467996651-dc3a1e622936?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Озеро Баскунчак',
    pic: 'https://images.unsplash.com/photo-1606590085022-85baf5b4216b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Новороссийск',
    pic: 'https://images.unsplash.com/photo-1646228292813-d44b78654ddf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Самара',
    pic: 'https://images.unsplash.com/photo-1646580062050-8348924bc539?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Уфа',
    pic: 'https://images.unsplash.com/photo-1630995354829-7da9fd843dd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  }
];

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup-profile');
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = document.querySelectorAll('.popup__close-icon');
const formProfileEdit = popupProfile.querySelector('[name=profile-form]');
const profileNameEl = document.querySelector('.profile__name');
const profileDescriptionEl = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('#popup-name');
const profileJobInput = document.querySelector('#popup-job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileSaveBtn = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card');
const cardNameInput = popupCard.querySelector('#card-name');
const cardPicInput = popupCard.querySelector('#card-pic');
const formCard = popupCard.querySelector('[name=card-form]');
const elementsList = document.querySelector('.elements');

const configs = {
  inputs: '.popup__input',
  submitButton: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardFormValidator = new FormValidator(configs, formCard);
cardFormValidator.enableValidation();

const editFormValidator = new FormValidator(configs, formProfileEdit);
editFormValidator.enableValidation();

function initialCardElement(name, pic) {
  const card = new Card({ name, pic }, '#element-template').generateCard();
  return card;
};

function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
  closePopup(popupProfile);
};

function handleCardAfterSubmit(evt) {
  evt.preventDefault();
  const cardElement = initialCardElement(cardNameInput.value, cardPicInput.value);
  elementsList.prepend(cardElement);
  closePopup(popupCard);
};

popups.forEach(function (popup) {
  popup.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
      closePopup(popup);
    };
  });
});

initialCards.forEach((item) => {
  const cardElement = initialCardElement(item.name, item.pic)
  elementsList.append(cardElement);
});

popupCloseBtn.forEach(function (btnClose) {
  btnClose.addEventListener('click', function (e) {
    const popup = e.target.closest('.popup');
    closePopup(popup);
  })
});

profileEditBtn.addEventListener('click', function () {
  profileNameInput.value = profileNameEl.textContent;
  profileJobInput.value = profileDescriptionEl.textContent;
  editFormValidator.resetErrors();
  openPopup(popupProfile);
});

formProfileEdit.addEventListener('submit', handleSubmitProfileForm);

profileSaveBtn.addEventListener('click', function () {
  formCard.reset();
  cardFormValidator.resetErrors();
  openPopup(popupCard);
});

formCard.addEventListener('submit', handleCardAfterSubmit);
