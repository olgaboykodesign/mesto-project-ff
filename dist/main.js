(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}var n=function(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))};function o(){var e=document.querySelector(".popup_is-opened");e.addEventListener("click",(function(n){n.currentTarget===n.target&&t(e)})),e.removeEventListener("click",o)}function r(){var e=document.querySelector(".popup_is-opened");e.querySelector(".popup__close").addEventListener("click",(function(){t(e),e.removeEventListener("click",r)}))}var c=document.querySelector("#card-template").content;function u(t,n,o){var r=c.querySelector(".card").cloneNode(!0),u=r.querySelector(".card__delete-button"),p=r.querySelector(".card__like-button"),d=r.querySelector(".card__image"),i=r.querySelector(".card__title"),a=document.querySelector(".popup_type_image"),l=document.querySelector(".popup__image"),s=document.querySelector(".popup__caption");return i.textContent=t,d.alt=t,d.src=n,u.addEventListener("click",(function(){return o(r)})),d.addEventListener("click",(function(){l.src=n,l.alt=t,s.textContent=t,e(a)})),p.addEventListener("click",(function(e){e.target.classList.contains("card__like-button")&&e.target.classList.toggle("card__like-button_is-active")})),r}function p(e){return e.remove(),e}document.querySelector(".content");var d=document.querySelector(".places__list"),i=document.querySelectorAll(".popup"),a=document.querySelector(".profile__add-button"),l=document.querySelector(".profile__edit-button"),s=document.querySelector(".popup_type_new-card"),_=s.querySelector(".popup__button"),m=document.forms["new-place"],y=document.querySelector(".popup__input_type_card-name"),v=document.querySelector(".popup__input_type_url"),f=document.forms["edit-profile"],k=document.querySelector(".popup__input_type_name"),q=document.querySelector(".popup__input_type_description"),S=document.querySelector(".popup_type_edit"),L=S.querySelector(".popup__button"),E=document.querySelector(".profile__title"),g=document.querySelector(".profile__description");[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){return d.append(u(e.name,e.link,p))})),i.forEach((function(e){e.addEventListener("click",o),e.addEventListener("click",r)})),a.addEventListener("click",(function(){e(s)})),l.addEventListener("click",(function(){k.value=E.textContent,q.value=g.textContent,e(S)})),f.addEventListener("submit",(function(e){e.preventDefault();var n=k.value,o=q.value;L.textContent="Сохранение...",t(S),E.textContent=n,g.textContent=o})),m.addEventListener("submit",(function(e){e.preventDefault();var n=y.value,o=v.value;_.textContent="Сохранение...",d.prepend(u(n,o,p)),t(s)}))})();