import type { InitialCardsType } from "./types/Types.js";
import { Section } from "./components/Section.js";
import { Card } from "./components/Card.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { editFormElement } from "./utils/Constants.js";
import { editButton } from "./utils/Constants.js";
import { newCardForm } from "./utils/Constants.js";
import { newCardButton } from "./utils/Constants.js";
import { UserInfo } from "./components/UserInfo.js";
import { userNameTitle } from "./utils/Constants.js";
import { userProfessionTitle } from "./utils/Constants.js";
import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig } from "./utils/Constants.js";
import {userPicture} from "./utils/Constants.js"
import {Api} from "./components/ServerRequest.js"
import { PopupWithConfirmation } from './components/PopupWithConfirmation.js';
import {editPhotoForm} from './utils/Constants.js';
import {editPhotoContainer} from "./utils/Constants.js"

const cardTemplate = document.querySelector(
  "#cards__template",
) as HTMLTemplateElement;

//Llamada de la informacion del usuario desde el servidor.
const renderUser = async(): Promise<void>=>{
  const userApi = new Api();

  const userData = await userApi.getUserInfo('https://around-api.es.tripleten-services.com/v1/users/me');

  userNameTitle.textContent=userData.name;
  userProfessionTitle.textContent=userData.about;
  userPicture.src=userData.avatar
}
renderUser()

//Llamada a las tarjetas del usuario.
const renderCards = async(): Promise<void>=>{
  const cardApi = new Api()
  const initialCards: InitialCardsType[]  = await cardApi.getCards('https://around-api.es.tripleten-services.com/v1/cards/');


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
      },
      async (isLiked: boolean) =>{

          const likeStatus = new Api()
          const confirmStatus = await likeStatus.isLiked(isLiked, `https://around-api.es.tripleten-services.com/v1/cards/${item._id}/likes`);
         return confirmStatus;
      },
      ()=>{
        const request = new Api()
        
        const deletePopup = new PopupWithConfirmation('#delete-confirmation-popup',
          async()=>{
            const deleteRequest = await request.deleteCard(card, `https://around-api.es.tripleten-services.com/v1/cards/${item._id}`)
        }) ;

        deletePopup.open();
        deletePopup.setEventListeners();
        deletePopup.confirmCardElimination()
      }
    );
      const cardElement = card.cardCreation();

      cards.addItem(cardElement);
    },
  },
  ".cards__list",
);
cards.renderItems();
}
renderCards()


const userProfileInfo = new UserInfo(userNameTitle, userProfessionTitle);


// Forms popup
//Edit form
const editFormPopup = new PopupWithForm(
  "#edit-popup",
  editFormElement,
  async (values) => {

    const {name, description} = values

    const requestChange = new Api();

      const data = await requestChange.editProfile(name, description, 'https://around-api.es.tripleten-services.com/v1/users/me');

        userProfileInfo.setUserInfo(data.name, data.about);
    
    
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
const newCard = new PopupWithForm(
  "#new-card-popup",
   newCardForm,
   async (values) => {
    const {name, link} = values;
    //proceso asincrono

    const sendNewCard = new Api();
    const cardCreation = await sendNewCard.addNewCard(name, link, 'https://around-api.es.tripleten-services.com/v1/cards/');

      const card = new Card(cardCreation, cardTemplate, () => {
    const imagePopup = new PopupWithImage(
      "#image-popup",
      cardCreation.link,
      cardCreation.name,
    );
    imagePopup.setEventListeners();
    imagePopup.open();
  },
  async (isLiked: boolean) =>{

          const likeStatus = new Api()
          const confirmStatus = await likeStatus.isLiked(isLiked, `https://around-api.es.tripleten-services.com/v1/cards/${cardCreation._id}/likes`);
         return confirmStatus;
      },
  ()=>{
const request = new Api()
        
        const deletePopup = new PopupWithConfirmation('#delete-confirmation-popup',
          async()=>{
            const deleteRequest = await request.deleteCard(card, `https://around-api.es.tripleten-services.com/v1/cards/${cardCreation._id}`)
        }) ;

        //abrir el popup de confirmacion
        deletePopup.open();

        // para identificar si presionan escape o cierran el popup
        deletePopup.setEventListeners();

        //solicitud al servidor para borrarlo cuando le dan click al boton de confirmar.
        deletePopup.confirmCardElimination()
  }
);
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

// Cambio de foto de perfil

const changeProfilePicture = new PopupWithForm(
  '#change-profile-picture-popup',
editPhotoForm,
async(values)=>{
  const {name: avatar} = values
  const changePictureRequest = new Api();
  const request = await changePictureRequest.ProfilePictureRequest(avatar, 'https://around-api.es.tripleten-services.com/v1/users/me/avatar')
  userPicture.src=avatar
})

editPhotoContainer.addEventListener('click', () => {
  changeProfilePicture.open();
});

changeProfilePicture.setEventListeners();

const changeProfilePictureValidation = new FormValidator(
  defaultFormConfig,
  editPhotoForm
)

changeProfilePictureValidation.enableValidation()
changeProfilePictureValidation.resetValidation()