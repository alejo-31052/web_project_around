export const defaultFormConfig ={ 
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

export const cardTemplate = document.querySelector('.cards__template') as HTMLTemplateElement;
export const imagePopupContainer = document.querySelector('#image-popup') as HTMLElement;


//FORMS VARIABLES
export const editFormElement = document.querySelector('#edit-profile-form') as HTMLFormElement;
export const formPopupDiv = document.querySelector('#edit-popup') as HTMLFormElement;
export const editButton = document.querySelector('.profile__edit-button') as HTMLButtonElement;
export const newCardPopup = document.querySelector('#new-card-popup') as HTMLElement;
export const newCardForm = document.querySelector('#new-card-form') as HTMLFormElement;
export const newCardButton = document.querySelector('.profile__add-button') as HTMLButtonElement;
export const editPhotoForm = document.querySelector('#change-profile-picture-form') as HTMLFormElement;
export const editPhotoContainer = document.querySelector('.profile__image-container') as HTMLDivElement;


// variables para actualizar el nombre del usuario 
export const userNameTitle = document.querySelector('.profile__title') as HTMLElement;
export const userProfessionTitle = document.querySelector('.profile__description') as HTMLElement;
export const userPicture = document.querySelector('.profile__image') as HTMLImageElement;