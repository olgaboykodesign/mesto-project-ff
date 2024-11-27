import { initialCards } from "./components/cards.js";
import {
  openModal,
  closeModal,
  closeModalOverlay,
  closeModalButton,
} from "./components/modal.js";
import { createCard, deleteCard } from "./components/card.js";
import "./pages/index.css";

const placesList = document.querySelector(".places__list");
const popup = document.querySelectorAll(".popup");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const newPlaceButton = popupNewCard.querySelector(".popup__button");

const newPlace = document.forms["new-place"];
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");

const formElement = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const popupEdit = document.querySelector(".popup_type_edit");
const profileButton = popupEdit.querySelector(".popup__button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//выводим карточки
initialCards.forEach((el) =>
  placesList.append(createCard(el.name, el.link, deleteCard))
);

//Вешаем слушатели закрытия по Overlay и крестику на все popup
popup.forEach((item) => {
  item.addEventListener("click", closeModalOverlay);
  item.addEventListener("click", closeModalButton);
});

addButton.addEventListener("click", function () {
  openModal(popupNewCard); // открываем попап добавления
});

editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit); // открываем попап редактирования профиля
});

// Форма редактирования профиля
function formEditProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = nameInput.value;
  const about = jobInput.value;
  profileButton.textContent = "Сохранение...";
  closeModal(popupEdit);
  profileTitle.textContent = name;
  profileDescription.textContent = about;
}

formElement.addEventListener("submit", formEditProfile);

// Форма добавления нового места
function addPlaceForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = placeNameInput.value;
  const link = linkInput.value;
  newPlaceButton.textContent = "Сохранение...";
  placesList.prepend(createCard(name, link, deleteCard));
  closeModal(popupNewCard);
}

newPlace.addEventListener("submit", addPlaceForm);
