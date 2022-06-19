import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
//import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import './index.css';
import Api from '../api/api.js';

// const nizhniy = new URL(
//   'https://images.unsplash.com/photo-1638009270386-f5e0e5b29a6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
// );
// const penza = new URL(
//   'https://images.unsplash.com/photo-1626467996651-dc3a1e622936?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
// );
// const baskunchak = new URL(
//   'https://images.unsplash.com/photo-1606590085022-85baf5b4216b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
// );
// const novoross = new URL(
//   'https://images.unsplash.com/photo-1646228292813-d44b78654ddf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
// );
// const samara = new URL(
//   'https://images.unsplash.com/photo-1646580062050-8348924bc539?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
// );
// const ufa = new URL(
//   'https://images.unsplash.com/photo-1630995354829-7da9fd843dd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
// );

// const initialCards = [
//   {
//     name: 'Нижний Новгород',
//     pic: nizhniy
//   },
//   {
//     name: 'Пенза',
//     pic: penza
//   },
//   {
//     name: 'Озеро Баскунчак',
//     pic: baskunchak
//   },
//   {
//     name: 'Новороссийск',
//     pic: novoross
//   },
//   {
//     name: 'Самара',
//     pic: samara
//   },
//   {
//     name: 'Уфа',
//     pic: ufa
//   }
// ];

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
  // cardsSection.addItem(createCardElement({ name, pic }), true)
  api.addCard({ name, link: pic })
    .then((data) => {
      cardsSection.addItem(createCardElement({ ...data, pic: data.link }), true)
      popupCardForm.close()
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
        popupUserForm.close(e);
      })
    // .then(({ username, description }) => userInfoInstance.getUserInfo({ username, description }))

  })

// function createCardElement(data) {
//   const card = cardInstance.generateCard()
//   // card.likeElement(likes)
//   //передать открытие попапа с согласием
//   //и установить этому попапу вложенный хендлер c методом удаления карточки по ИД
//   return card;
// };

// function handleSubmitProfileForm(e) {
//   const username = profileNameInput.value
//   const description = profileJobInput.value
//   userInfoInstance.setUserInfo({ username, description })
//   popupUserForm.close(e);
// };
//comment this function

popupUserForm.setEventListeners()
popupCardForm.setEventListeners()
popupCardImage.setEventListeners()

const popupAvatarForm = new PopupWithForm('.popup-avatar', (inputData) => {
  api.changeAvatar(inputData)
    .then((data) => {
      userInfoInstance.setUserInfo(data)
      popupAvatarForm.close()
    })
})
popupAvatarForm.setEventListeners()
const popupConfirm = new PopupWithConfirmation('.popup-confirm', document.querySelector('[name=confirm-form]'))
popupConfirm.setEventListeners()

profileEditBtn.addEventListener('click', function (e) {
  const { name, about } = userInfoInstance.getUserInfo()
  profileNameInput.value = name
  profileJobInput.value = about
  popupUserForm.open(e);
});

const avatarBtn = document.querySelector('.profile__avatar-button')
avatarBtn.addEventListener('click', function (e) {
  popupAvatarForm.open()
});
popupAvatarForm.setEventListeners()

// formProfileEdit.addEventListener('submit', () => {
//   handleSubmitProfileForm(
//     api.addUser(userInfoInstance.getUserInfo({}))
//     //.then((data) => api.getUser())
//   )
// })

profileSaveBtn.addEventListener('click', function (e) {
  cardFormValidator.resetErrors();
  popupCardForm.open(e);
});


// fetch('https://mesto.nomoreparties.co/v1/cohort-43/users/me', {
//   headers: {
//     'authorization': 'f36e7156-517e-4278-9213-56884bb1e4f8'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   })

api.getUser()
  .then((r) => {
    userInfoInstance.setUserInfo(r)

    api.getCards()
      .then((data) => { // data: [{name: string, link: string, ...rest}] => [{name: string, pic: string}]
        const preparedData = data.map(function ({ name, link, ...rest }) {
          const preparedDataItem = { name, pic: link, ...rest };
          // cardsSection.addItem(createCardElement(preparedDataItem))
          return preparedDataItem
        });

        // const preparedData = data.map(({ name, link }) => ({ name, pic: link }))
        cardsSection.renderItems(preparedData)
      });
  })

function createCardElement(dataItem) {
  const { name, pic } = dataItem;

  const handleCardClick = () => popupCardImage.open({ name, pic })

  const handleLike = (cardId, hasMyLike = false) => {
    if (!hasMyLike) {
      return api.likeCard(cardId);
    }
    return api.dislikeCard(cardId);
  }

  const handleDelete = () => {
    popupConfirm.open()
    popupConfirm.setHandler(() => {
      api.deleteCard(card._cardId)
        .then((res) => {
          card._delElement()
          popupConfirm.close()
        })
    })
  }

  const card = new Card(
    dataItem,
    '#element-template',
    handleCardClick,
    handleLike,
    handleDelete,
    userInfoInstance.getUserInfo())

  return card.generateCard()
}
