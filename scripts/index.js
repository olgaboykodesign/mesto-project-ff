const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const templateCard = document.querySelector("#card-template").content;

function createCard(name, link, deleteCard) {
  const places__item = templateCard.querySelector(".card").cloneNode(true);
  places__item.querySelector(".card__image").src = link;
  places__item.querySelector(".card__title").textContent = name;
  const deleteButton = places__item.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(places__item));
  return places__item;
}

function deleteCard(places__item) {
  places__item.remove();
  return places__item;
}

initialCards.forEach((el) =>
  placesList.append(createCard(el.name, el.link, deleteCard))
);
