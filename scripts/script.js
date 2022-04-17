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

const popupProfile = document.querySelector('.popup-profile');
const editBtn = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-icon');
const formProfileEdit = popupProfile.querySelector('[name=profile-form]');
const profileNameEl = document.querySelector('.profile__name');
const profileDescriptionEl = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('#popup-name');
const profileJobInput = document.querySelector('#popup-job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elementTemplate = document.querySelector('#element-template').content;
const elementsContainer = document.querySelector('.elements');
const addBtn = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card');
const cardNameInput = popupCard.querySelector('#card-name');
const cardPicInput = popupCard.querySelector('#card-pic');
const formCard = popupCard.querySelector('[name=card-form]');

initialCards.forEach(function (item) {
  const resultCreateCard = createCard(item.name, item.pic);
  elementsContainer.append(resultCreateCard);
});

function createCard(name, src) {
  const cardTemplate = elementTemplate.cloneNode(true);
  cardTemplate.querySelector('.element__name').textContent = name;
  const imgCard = cardTemplate.querySelector('.element__pic');
  imgCard.src = src;
  imgCard.alt = name;
  bindCardEventHandlers(cardTemplate);
  return cardTemplate;
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function handleSubmitForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
  const popup = evt.target.closest('.popup');
  closePopup(popup);
};

function handleSubmitCard(evt) {
  evt.preventDefault();
  const resultCreateTemplate = createCard(cardNameInput.value, cardPicInput.value);
  elementsContainer.prepend(resultCreateTemplate);
  const popup = evt.target.closest('.popup');
  closePopup(popup);
  evt.target.reset();
};

function bindCardEventHandlers(cardElement) {
  const cardButtonLike = cardElement.querySelector('.element__like');
  cardButtonLike.addEventListener('click', likeElement);
  const cardButtonTrash = cardElement.querySelector('.element__trash-button');
  cardButtonTrash.addEventListener('click', delElement);
  const cardPicBtn = cardElement.querySelector('.element__pic');
  cardPicBtn.addEventListener('click', openPhoto);
};

function likeElement(event) {
  event.target.classList.toggle('element__like_active');
};

function delElement(event) {
  const cardTrash = event.target.closest('.element');
  cardTrash.remove();
};

function openPhoto(evt) {
  document.querySelector('.popup-pic .popup-pic__alt').textContent = evt.target.alt;
  const imgPopup = document.querySelector('.popup-pic__photo');
  imgPopup.src = evt.target.src;
  imgPopup.setAttribute("alt", evt.target.alt);
  imgPopup.onload = function () {
    const popupPhoto = document.querySelector('.popup-pic');
    openPopup(popupPhoto);
  };
};

closeButtons.forEach(function (closeBtn) {
  closeBtn.addEventListener('click', function (e) {
    const popup = e.target.closest('.popup');
    closePopup(popup);
  })
});
editBtn.addEventListener('click', function () {
  openPopup(popupProfile);
});
formProfileEdit.addEventListener('submit', handleSubmitForm);
addBtn.addEventListener('click', function () {
  openPopup(popupCard);
});
formCard.addEventListener('submit', handleSubmitCard);
