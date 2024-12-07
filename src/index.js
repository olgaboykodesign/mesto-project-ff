import { initialCards } from "./components/cards.js";
import {
  getUser,
  getInitialCards,
  patchUserInfo,
  postNewCard,
  patchAvatar,
} from "./components/api.js";
import { enableValidation, clearValidation } from "./components/validation.js";
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
const buttonNewCard = popupNewCard.querySelector(".popup__button");

const editProfileForm = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const popupEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const buttonEditProfile = popupEdit.querySelector(".popup__button");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const imagePopupContainer = document.querySelector(".popup_type_image");

const profileAvatarForm = document.forms["avatar-profile"];
const editProfileAvatarImage = document.querySelector(".profile__image");
const popupEditProfileAvatar = document.querySelector(
  ".popup_type_edit_avatar"
);
const editAvatarInput = document.querySelector(".popup__input_type_avatar");
const buttonEditAvatar = popupEditProfileAvatar.querySelector(".popup__button");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let userId = "";

// Функция для открытия попапа с изображением
export function openImagePopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopupContainer);
}

// Закрытие попапов
setCloseModalByClickListeners(popup);

// вызываем попап добавления нового места
addButton.addEventListener("click", function () {
  clearValidation(newPlaceForm, validationConfig);
  newPlaceForm.reset();
  openModal(popupNewCard);
});

// вызываем попап аватара
editProfileAvatarImage.addEventListener("click", () => {
  clearValidation(profileAvatarForm, validationConfig);
  profileAvatarForm.reset();
  openModal(popupEditProfileAvatar);
});

// вызываем попап редактирования профиля
editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(popupEdit);
});

// форма редактирования профиля
function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = jobInput.value;
  buttonEditProfile.textContent = "Сохранение...";
  patchUserInfo(name, about)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonEditProfile.textContent = "Сохранить";
    });
}

// форма добавления нового места
function handlePlaceAddFormSubmit(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = linkInput.value;
  buttonNewCard.textContent = "Сохранение...";
  postNewCard(name, link)
    .then((data) => {
      const newCard = createCard(
        data.name,
        data.link,
        data._id,
        data.likes,
        data.owner,
        openImagePopup,
        handleLikeClick,
        userId
      );
      addNewCard(newCard);
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log("Полученные данные при создании карточки:", data);
    })
    .finally(() => {
      buttonNewCard.textContent = "Сохранить";
    });
}

function addNewCard(placesItem) {
  placesList.prepend(placesItem);
}

// Форма редактирования аватара
function handleProfileAvatarForm(evt) {
  evt.preventDefault();
  const avatar = editAvatarInput.value;
  buttonEditAvatar.textContent = "Сохранение...";
  patchAvatar(avatar)
    .then((data) => {
      editProfileAvatarImage.style.backgroundImage = `url('${data.avatar}')`;
      closeModal(popupEditProfileAvatar);
      profileAvatarForm.reset();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      buttonEditAvatar.textContent = "Сохранить";
    });
}

editProfileForm.addEventListener("submit", handleProfileEditFormSubmit);
newPlaceForm.addEventListener("submit", handlePlaceAddFormSubmit);
profileAvatarForm.addEventListener("submit", handleProfileAvatarForm);

Promise.all([getUser(), getInitialCards()])
  .then(([userInfo, data]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    editProfileAvatarImage.style.backgroundImage = `url('${userInfo.avatar}')`;
    userId = userInfo._id;
    data.forEach((item) => {
      const allCard = createCard(
        item.name,
        item.link,
        item._id,
        item.likes,
        item.owner,
        openImagePopup,
        handleLikeClick,
        userId
      );
      placesList.append(allCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);
