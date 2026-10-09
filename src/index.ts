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

const api = new Api({
  url: 'https://around-api.es.tripleten-services.com/v1/',
  headers: {
    authorization: '25cd8390-a38b-4c26-9455-c3a4437cd5d2',
    'Content-Type': 'application/json',
  },
});

let currentUserId: string;

//Llamada de la informacion del usuario desde el servidor.
const renderUser = async(): Promise<void>=>{

  const userData = await api.getUserInfo();

  userNameTitle.textContent=userData.name;
  userProfessionTitle.textContent=userData.about;
  userPicture.src=userData.avatar
  currentUserId=userData._id
  console.log(currentUserId)

}
renderUser()

//Llamada a las tarjetas del usuario.
const renderCards = async(): Promise<void>=>{
  const initialCards: InitialCardsType[]  = await api.getCards();


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
          const confirmStatus = await api.isLiked(isLiked, item._id);
         return confirmStatus;
      },
      ()=>{
        
        const deletePopup = new PopupWithConfirmation('#delete-confirmation-popup',
          async()=>{
            const deleteRequest = await api.deleteCard(card, item._id)
        }) ;

        deletePopup.open();
        deletePopup.setEventListeners();
        deletePopup.confirmCardElimination()
      }
    );
      const cardElement = card.cardCreation(currentUserId, item.owner);

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

      const data = await api.editProfile(name, description);

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
    const cardCreation = await api.addNewCard(name, link);

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
          const confirmStatus = await api.isLiked(isLiked, cardCreation._id);
         return confirmStatus;
      },
  ()=>{
        
        const deletePopup = new PopupWithConfirmation('#delete-confirmation-popup',
          async()=>{
            const deleteRequest = await api.deleteCard(card, `https://around-api.es.tripleten-services.com/v1/cards/${cardCreation._id}`)
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
  const renderedCard = card.cardCreation(currentUserId ,cardCreation.owner);
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
  const request = await api.ProfilePictureRequest(avatar)
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

const prueba = async  () =>{

  const res = await fetch('https://around-api.es.tripleten-services.com/v1/cards', {
    headers:{
      authorization: '25cd8390-a38b-4c26-9455-c3a4437cd5d2',
    'Content-Type': 'application/json',
    }}
  )

  const data = await res.json()

  console.log(data);
}

prueba();