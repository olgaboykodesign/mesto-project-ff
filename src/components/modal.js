//Функция открытия popup
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalEsc);
}

//Функция закрытия popup
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEsc);
}

//Закрытия popup клавишей Esc
const closeModalEsc = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
    closeModal(popup);
  }
};

// Обработчик клика по оверлею
function handleCloseModalByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

// Функция установки обработчиков закрытия попапов
function setCloseModalByClickListeners(popupList) {
  popupList.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => closeModal(popup));
    popup.addEventListener("click", handleCloseModalByOverlay);
  });
}

export { openModal, closeModal, setCloseModalByClickListeners };
