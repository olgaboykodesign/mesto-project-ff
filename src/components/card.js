import { openImagePopup } from "../index.js";

const templateCard = document.querySelector("#card-template").content;
const content = document.querySelector(".content");

function createCard(name, link, deleteCard) {
  const placesItem = templateCard.querySelector(".card").cloneNode(true);
  const deleteButton = placesItem.querySelector(".card__delete-button");
  const likeButton = placesItem.querySelector(".card__like-button");
  const cardImg = placesItem.querySelector(".card__image");
  const cardName = placesItem.querySelector(".card__title");

  cardName.textContent = name;
  cardImg.alt = name;
  cardImg.src = link;

  deleteButton.addEventListener("click", () => deleteCard(placesItem));

  likeButton.addEventListener("click", handleLikeClick);

  cardImg.addEventListener("click", () => {
    const name = cardName.textContent;
    const link = cardImg.src;
    openImagePopup(name, link);
  });

  return placesItem;
}

function deleteCard(placesItem) {
  placesItem.remove();
}

function handleLikeClick(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export { createCard, deleteCard, handleLikeClick };
