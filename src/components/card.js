import { putLikesCard, unLikesCard, deleteMyCard } from "./api.js";

const templateCard = document.querySelector("#card-template").content;

function createCard(
  name,
  link,
  id,
  likes,
  owner,
  openImagePopup,
  handleLikeClick,
  userId
) {
  const placesItem = templateCard.querySelector(".card").cloneNode(true);
  const cardImg = placesItem.querySelector(".card__image");
  const cardName = placesItem.querySelector(".card__title");
  const deleteButton = placesItem.querySelector(".card__delete-button");
  const likeButton = placesItem.querySelector(".card__like-button");
  const likeCount = placesItem.querySelector(".card__like-count");

  cardName.textContent = name;
  cardImg.alt = name;
  cardImg.src = link;

  likeCount.textContent = likes.length;

  if (userId !== owner._id) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCard(id, placesItem);
    });
  }

  if (likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Установка обработчика для кнопки лайка
  likeButton.addEventListener("click", () => {
    handleLikeClick(id, likeButton, likeCount);
  });

  // Обработчик для клика на изображение
  cardImg.addEventListener("click", () => {
    openImagePopup(name, link);
  });

  return placesItem;
}

function deleteCard(id, placesItem) {
  deleteMyCard(id)
    .then(() => {
      placesItem.remove();
      console.log("Карточка успешно удалена");
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
}

//Функция лайка на карточку
function handleLikeClick(id, likeButton, likeCount) {
  const isActive = likeButton.classList.contains("card__like-button_is-active");
  const action = isActive ? unLikesCard : putLikesCard;

  action(id)
    .then((res) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error("Ошибка при обработке лайка:", err);
    });
}

export { createCard, deleteCard, handleLikeClick };
