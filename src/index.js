import { initialCards } from "./components/cards.js";
import {
  openModal,
  closeModal,
  setCloseModalByClickListeners,
} from "./components/modal.js";
import { createCard, deleteCard, handleLikeClick } from "./components/card.js";
import "./pages/index.css";

const placesList = document.querySelector(".places__list");
const popup = document.querySelectorAll(".popup");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

const newPlaceForm = document.forms["new-place"];
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");

const editProfileForm = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const popupEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const imagePopupContainer = document.querySelector(".popup_type_image");

//выводим карточки
initialCards.forEach((el) =>
  placesList.append(createCard(el.name, el.link, deleteCard))
);

// Функция для открытия попапа с изображением
export function openImagePopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopupContainer);
}

// Закрытие попапов
setCloseModalByClickListeners(popup);

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
  closeModal(popupEdit);
  profileTitle.textContent = name;
  profileDescription.textContent = about;
}

// Форма добавления нового места
function handlePlaceAddFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = placeNameInput.value;
  const link = linkInput.value;
  placesList.prepend(createCard(name, link, deleteCard));
  evt.target.reset();
  closeModal(popupNewCard);
}

editProfileForm.addEventListener("submit", formEditProfile);
newPlaceForm.addEventListener("submit", handlePlaceAddFormSubmit);
