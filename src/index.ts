import type { InitialCardsType } from "./types/Types.js";
import { Section } from "./components/Section.js";
import { Card } from "./components/Card.js";
import { initialCards } from "./utils/Constants.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { editFormElement } from "./utils/Constants.js";
import { formPopupDiv } from "./utils/Constants.js";
import { editButton } from "./utils/Constants.js";
import { newCardPopup } from "./utils/Constants.js";
import { newCardForm } from "./utils/Constants.js";
import { newCardButton } from "./utils/Constants.js";
import { UserInfo } from "./components/UserInfo.js";
import { userNameTitle } from "./utils/Constants.js";
import { userProfessionTitle } from "./utils/Constants.js";
import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig } from "./utils/Constants.js";

const cardTemplate = document.querySelector(
  "#cards__template",
) as HTMLTemplateElement;

const cards = new Section<InitialCardsType>(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplate, () => {
        const imagePopup = new PopupWithImage(
          "#image-popup",
          item.link,
          item.name,
        );
        imagePopup.setEventListeners();
        imagePopup.open();
      });
      const cardElement = card.cardCreation();

      cards.addItem(cardElement);
    },
  },
  ".cards__list",
);
cards.renderItems();


const userProfileInfo = new UserInfo(userNameTitle, userProfessionTitle);


// Forms popup
//Edit form
const editFormPopup = new PopupWithForm(
  "#edit-popup",
  editFormElement,
  (values) => {
    userProfileInfo.setUserInfo(values.name, values.description);
  }
);

//Eventlisteners de los botones para editar/agregar imagen
editButton.addEventListener("click", () => {
  editFormPopup.open();
  const firstInput=editFormElement.querySelector('.popup__input_type_name') as HTMLInputElement;
  const secondInput=editFormElement.querySelector('.popup__input_type_description') as HTMLInputElement;
  firstInput.value=userNameTitle.textContent;
  secondInput.value=userProfessionTitle.textContent;

});
editFormPopup.setEventListeners();

//Form Validation
const editFormValidation = new FormValidator(
  defaultFormConfig,
  editFormElement,
);
editFormValidation.enableValidation();
editFormValidation.resetValidation();

//Add new Card form
const newCard = new PopupWithForm("#new-card-popup", newCardForm, (values) => {
  const card = new Card(values, cardTemplate, () => {
    const imagePopup = new PopupWithImage(
      "#image-popup",
      values.link,
      values["place-name"],
    );
    imagePopup.setEventListeners();
    imagePopup.open();
  });
  const cardContainer = document.querySelector(
    ".cards__list",
  ) as HTMLDivElement;
  const renderedCard = card.cardCreation();
  cardContainer.prepend(renderedCard);
});
newCardButton.addEventListener("click", () => {
  newCard.open();
});
newCard.setEventListeners();

const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
newCardFormValidator.enableValidation();
newCardFormValidator.resetValidation();


// document.querySelector('.profile__title') as HTMLElement
// document.querySelector('.profile__description') as HTMLElement