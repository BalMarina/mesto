import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import './index.css';
import Api from '../components/Api.js';


const popupProfile = document.querySelector('.popup-profile');
const profileEditBtn = document.querySelector('.profile__edit-button');
const formProfileEdit = popupProfile.querySelector('[name=profile-form]');
const profileNameInput = document.querySelector('#popup-name');
const profileJobInput = document.querySelector('#popup-job');
const profileSaveBtn = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card');
const formCard = popupCard.querySelector('[name=card-form]');
const formAvatar = document.querySelector('[name=avatar-form]');

const configs = {
  inputs: '.popup__input',
  submitButton: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-43')

const cardFormValidator = new FormValidator(configs, formCard);
cardFormValidator.enableValidation();

const editFormValidator = new FormValidator(configs, formProfileEdit);
editFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(configs, formAvatar);
avatarFormValidator.enableValidation();

const cardsSection = new Section({
  renderer: (data) =>
    cardsSection.addItem(createCardElement(data))
},
  '.elements')

const popupCardImage = new PopupWithImage('.popup-pic')

const popupCardForm = new PopupWithForm('.popup-card', ({ name, pic }) => {
  api.addCard({ name, link: pic })
    .then((data) => {
      cardsSection.addItem(createCardElement({ ...data, pic: data.link }), true)
      popupCardForm.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupCardForm.renderLoading(true)
    })
})

const userInfoInstance = new UserInfo('.profile__name', '.profile__description', '.profile__avatar')

const popupUserForm = new PopupWithForm('.popup-profile',
  (e) => {
    const username = profileNameInput.value
    const description = profileJobInput.value
    api.addUser({ name: username, about: description })
      .then((data) => {
        userInfoInstance.setUserInfo(data)
        popupUserForm.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupUserForm.renderLoading(true)
      })
  })

const popupAvatarForm = new PopupWithForm('.popup-avatar', (inputData) => {
  api.changeAvatar(inputData)
    .then((data) => {
      userInfoInstance.setUserInfo(data)
      popupAvatarForm.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAvatarForm.renderLoading(true)
    })
})

const popupConfirm = new PopupWithConfirmation('.popup-confirm', document.querySelector('[name=confirm-form]'))

const avatarBtn = document.querySelector('.profile__avatar-button')

function handleCardClick(name, pic) {
  popupCardImage.open({ name, pic })
}

function handleLike(dataItem, hasMyLike = false) {
  const cardId = dataItem
  if (!hasMyLike) {
    return api.likeCard(cardId)
      .catch((err) => {
        console.log(err)
      })
  }
  return api.dislikeCard(cardId)
    .catch((err) => {
      console.log(err)
    })
}

function handleDelete(card) {
  popupConfirm.open()
  popupConfirm.setHandler(() => delCard(card))
}

function delCard(card) {
  api.deleteCard(card._cardId)
    .then(() => {
      card._delElement()
      popupConfirm.close()
    })
    .catch((err) => {
      console.log(err)
    })
}

function createCardElement(dataItem) {
  const card = new Card(
    dataItem,
    '#element-template',
    handleCardClick,
    handleLike,
    handleDelete,
    userInfoInstance.getUserInfo())

  return card.generateCard()
}

popupUserForm.setEventListeners()
popupCardForm.setEventListeners()
popupCardImage.setEventListeners()
popupAvatarForm.setEventListeners()
popupConfirm.setEventListeners()

profileEditBtn.addEventListener('click', function (e) {
  const { name, about } = userInfoInstance.getUserInfo()
  profileNameInput.value = name
  profileJobInput.value = about
  editFormValidator.resetErrors();
  popupUserForm.open();
});

avatarBtn.addEventListener('click', function (e) {
  avatarFormValidator.resetErrors()
  popupAvatarForm.open()
});

profileSaveBtn.addEventListener('click', function (e) {
  cardFormValidator.resetErrors();
  popupCardForm.open();
});

Promise.all([
  api.getUser(),
  api.getCards()
])
  .then((data) => {
    userInfoInstance.setUserInfo(data[0])

    const preparedData = data[1].map(function ({ name, link, ...rest }) {
      const preparedDataItem = { name, pic: link, ...rest };
      return preparedDataItem
    })
    cardsSection.renderItems(preparedData)
  })
  .catch((err) => {
    console.log(err)
  })

