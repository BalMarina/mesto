const popupProfile = document.querySelector('.popup-profile')
const editBtn = document.querySelector('.profile__edit-button')
const closeButtons = document.querySelectorAll('.popup__close-icon')
const form = popupProfile.querySelector('[name=profile-form]');
const profileNameEl = document.querySelector('.profile__name')
const profileDescriptionEl = document.querySelector('.profile__description')
const nameInput = document.querySelector('#popup-name')
const jobInput = document.querySelector('#popup-job')
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')

function popupOpen() {
  nameInput.value = profileNameEl.textContent
  jobInput.value = profileDescriptionEl.textContent
  popupProfile.classList.add('popup_opened')
}

function popupClose(e) {
  const closestPopup = e.target.closest('.popup')
  closestPopup.classList.remove('popup_opened')
}

function formSubmitHandler(evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
  popupClose(evt)
}

closeButtons.forEach(function (closeBtn) {
  closeBtn.addEventListener('click', popupClose)
});

editBtn.addEventListener('click', popupOpen)

form.addEventListener('submit', formSubmitHandler)


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

const elementTemplate = document.querySelector('#element-template').content;
const elementsContainer = document.querySelector('.elements');

const addBtn = document.querySelector('.profile__add-button')
const CardCloseBtn = document.querySelector('.popup__close-icon')
const popupCard = document.querySelector('.popup-card');
const cardNameInput = popupCard.querySelector('#card-name')
const cardPicInput = popupCard.querySelector('#card-pic')


initialCards.forEach(function (item) {
  const cardTemplate = elementTemplate.cloneNode(true);
  cardTemplate.querySelector('.element__name').textContent = item.name;
  cardTemplate.querySelector('.element__pic').src = item.pic;
  elementsContainer.append(cardTemplate);
});

function cardFormOpen() {
  popupCard.classList.add('popup_opened');
}

function cardSubmitHandler(evt) {
  evt.preventDefault()
  const cardTemplate = elementTemplate.cloneNode(true);
  cardTemplate.querySelector('.element__name').textContent = cardNameInput.value;
  cardTemplate.querySelector('.element__pic').src = cardPicInput.value;
  elementsContainer.prepend(cardTemplate);
  popupClose(evt)
}

addBtn.addEventListener('click', cardFormOpen);
popupCard.addEventListener('submit', cardSubmitHandler)
