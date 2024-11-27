import { openModal } from "./modal";

export { createCard, deleteCard };

const templateCard = document.querySelector("#card-template").content;
const content = document.querySelector(".content");

function createCard(name, link, deleteCard) {
  const placesItem = templateCard.querySelector(".card").cloneNode(true);
  const deleteButton = placesItem.querySelector(".card__delete-button");
  const likeButton = placesItem.querySelector(".card__like-button");
  const cardImg = placesItem.querySelector(".card__image");
  const cardName = placesItem.querySelector(".card__title");

  const openPopupImg = document.querySelector(".popup_type_image");
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");

  cardName.textContent = name;
  cardImg.alt = name;
  cardImg.src = link;

  deleteButton.addEventListener("click", () => deleteCard(placesItem));

  cardImg.addEventListener("click", () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(openPopupImg);
  });

  likeButton.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("card__like-button")) {
      evt.target.classList.toggle("card__like-button_is-active");
    }
  });

  return placesItem;
}

function deleteCard(placesItem) {
  placesItem.remove();
  return placesItem;
}
