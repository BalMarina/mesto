const popupCard = document.querySelector('.popup-card');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupOnEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupOnEsc);
  const popupForm = popup.querySelector('.popup__form');
  if (popupForm) {
    popupForm.reset();
  };
};

function closePopupOnEsc(e) {
  if (e.key == 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

export { popupCard, openPopup, closePopup };
