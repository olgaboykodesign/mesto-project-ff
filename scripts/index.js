const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const templateCard = document.querySelector("#card-template").content;

function createCard(name, link, deleteCard) {
  const placesItem = templateCard.querySelector(".card").cloneNode(true);
  placesItem.querySelector(".card__image").src = link;
  placesItem.querySelector(".card__image").alt = `Изображение ${name}`;
  placesItem.querySelector(".card__title").textContent = name;
  const deleteButton = placesItem.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(placesItem));
  return placesItem;
}

function deleteCard(placesItem) {
  placesItem.remove();
  return placesItem;
}

initialCards.forEach((el) =>
  placesList.append(createCard(el.name, el.link, deleteCard))
);
