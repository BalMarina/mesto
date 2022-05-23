function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupOnEsc);
};

function openPopupWithForm(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupWithFormOnEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupOnEsc);
};

function closePopupWithForm(popup) {
  const popupForm = popup.querySelector('.popup__form');
  if (popupForm) {
    popupForm.reset();
  }
  closePopup(popup);
};

function closePopupOnEsc(e) {
  if (e.key == 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

function closePopupWithFormOnEsc(e) {
  if (e.key == 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopupWithForm(openedPopup);
  }
};

function setPopupCloseHandler(popup, closeHandler) {
  const popupCloseBtn = popup.querySelector('.popup__close-icon');

  popup.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
      closeHandler(popup);
    };
  });

  popupCloseBtn.addEventListener('click', function (e) {
    closeHandler(popup);
  });
}

export { openPopup, openPopupWithForm, closePopup, closePopupWithForm, setPopupCloseHandler };
