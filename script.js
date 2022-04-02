const popupEl = document.querySelector('.popup')
const editBtn = document.querySelector('.profile__edit-button')
const closeBtn = document.querySelector('.popup__close-icon')

closeBtn.addEventListener('click', function () {
  popupEl.style.display = 'none'
})

editBtn.addEventListener('click', function (e) {
  popupEl.style.display = 'flex'
})

let formElement = document.querySelector('.popup')
let nameInput = document.querySelector('#popup-name')
let jobInput = document.querySelector('#popup-job')

function formSubmitHandler (evt) {
  evt.preventDefault()
  console.log(nameInput.value)
  console.log(jobInput.value)
  let profileName = document.querySelector('.profile__name')
  let profileDescription = document.querySelector('.profile__description')
  profileName.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
  popupEl.style.display = 'none'
}

formElement.addEventListener('submit', formSubmitHandler)
