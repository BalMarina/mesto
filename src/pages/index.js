import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import './index.css';

const nizhniy = new URL(
  'https://images.unsplash.com/photo-1638009270386-f5e0e5b29a6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
);
const penza = new URL(
  'https://images.unsplash.com/photo-1626467996651-dc3a1e622936?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
);
const baskunchak = new URL(
  'https://images.unsplash.com/photo-1606590085022-85baf5b4216b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
);
const novoross = new URL(
  'https://images.unsplash.com/photo-1646228292813-d44b78654ddf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
);
const samara = new URL(
  'https://images.unsplash.com/photo-1646580062050-8348924bc539?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
);
const ufa = new URL(
  'https://images.unsplash.com/photo-1630995354829-7da9fd843dd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
);

const initialCards = [
  {
    name: 'Нижний Новгород',
    pic: nizhniy
  },
  {
    name: 'Пенза',
    pic: penza
  },
  {
    name: 'Озеро Баскунчак',
    pic: baskunchak
  },
  {
    name: 'Новороссийск',
    pic: novoross
  },
  {
    name: 'Самара',
    pic: samara
  },
  {
    name: 'Уфа',
    pic: ufa
  }
];

const popupProfile = document.querySelector('.popup-profile');
const profileEditBtn = document.querySelector('.profile__edit-button');
const formProfileEdit = popupProfile.querySelector('[name=profile-form]');
const profileNameInput = document.querySelector('#popup-name');
const profileJobInput = document.querySelector('#popup-job');
const profileSaveBtn = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card');
const formCard = popupCard.querySelector('[name=card-form]');

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

const cardsSection = new Section({
  data: initialCards,
  renderer: ({ name, pic }) =>
    cardsSection.addItem(initialCardElement({ name, pic }))
},
  '.elements')

const popup = new Popup('.popup')

const popupCardImage = new PopupWithImage('.popup-pic')

const popupCardForm = new PopupWithForm('.popup-card', ({ name, pic }) => {
  cardsSection.addItem(initialCardElement({ name, pic }), true)
  popupCardForm.close()
})

const userInfoInstance = new UserInfo('.profile__name', '.profile__description')

const popupUserForm = new PopupWithForm('.popup-profile',
  ({ username, description }) => {
    userInfoInstance.setUserInfo({ username, description })
    popupUserForm.reset()
  })

function initialCardElement({ name, pic }) {
  const card = new Card(
    { name, pic },
    '#element-template',
    () => popupCardImage.open({ name, pic }))
    .generateCard()
  return card;
};

function handleSubmitProfileForm(e) {
  const username = profileNameInput.value
  const description = profileJobInput.value
  userInfoInstance.setUserInfo({ username, description })
  popupUserForm.close(e);
};

cardsSection.renderItems()
popup.setEventListeners()
popupCardForm.setEventListeners()
popupCardImage.setEventListeners()

profileEditBtn.addEventListener('click', function (e) {
  const { username, description } = userInfoInstance.getUserInfo()
  profileNameInput.value = username
  profileJobInput.value = description
  popupUserForm.open(e);
});

formProfileEdit.addEventListener('submit', handleSubmitProfileForm);

profileSaveBtn.addEventListener('click', function (e) {
  formCard.reset();
  cardFormValidator.resetErrors();
  popupCardForm.open(e);
});



