const popupEl = document.querySelector('.popup')
const editBtn = document.querySelector('.profile__edit-button')
const closeBtn = document.querySelector('.popup__close-icon')
const form = popupEl.querySelector('[name=profile-form]');
const profileNameEl = document.querySelector('.profile__name')
const profileDescriptionEl = document.querySelector('.profile__description')
const nameInput = document.querySelector('#popup-name')
const jobInput = document.querySelector('#popup-job')
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')

function popupOpen() {
  nameInput.value = profileNameEl.textContent
  jobInput.value = profileDescriptionEl.textContent
  popupEl.classList.add('popup_opened')
}

function popupClose() {
  popupEl.classList.remove('popup_opened')
}

function formSubmitHandler(evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
  popupClose()
}

closeBtn.addEventListener('click', popupClose)

editBtn.addEventListener('click', popupOpen)

form.addEventListener('submit', formSubmitHandler)
