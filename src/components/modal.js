export { openModal, closeModal, closeModalOverlay, closeModalButton };

//Функция открытия popup
function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalEsc);
}

//Функция закрытия popup
function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEsc);
}

//Закрытия popup клавишей Esc
const closeModalEsc = (e) => {
  if (e.key === "Escape") {
    const popupElement = document.querySelector(".popup_is-opened"); // находим открытый попап
    closeModal(popupElement);
  }
};

//Закрытия popup Overlay
function closeModalOverlay() {
  const popupElement = document.querySelector(".popup_is-opened"); // находим открытый попап
  popupElement.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closeModal(popupElement);
    }
  });
  popupElement.removeEventListener("click", closeModalOverlay);
}

//Закрытия popup крестиком
function closeModalButton() {
  const popupElement = document.querySelector(".popup_is-opened");
  const closeButton = popupElement.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(popupElement);
    popupElement.removeEventListener("click", closeModalButton);
  });
}
