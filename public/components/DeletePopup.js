import { Popup } from "./Popup.js";
export class DeletePopup extends Popup {
    handleDeleteRequest;
    constructor(popupSelector, handleDeleteRequest) {
        super(popupSelector),
            this.handleDeleteRequest = handleDeleteRequest;
    }
    confirmCardElimination() {
        const popup = document.querySelector(this.popupSelector);
        const cardPopup = popup.querySelector('.popup__content');
        const deleteConfirmationButton = cardPopup.querySelector('.popup__button');
        deleteConfirmationButton.addEventListener('click', async () => {
            await this.handleDeleteRequest();
            this.close();
        });
    }
}
