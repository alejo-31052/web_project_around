import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    cardPopup;
    deleteConfirmationButton;
    originalButtonText = "";
    handleDeleteRequest = async () => { };
    constructor(popupSelector) {
        super(popupSelector);
        const popup = document.querySelector(this.popupSelector);
        this.cardPopup = popup.querySelector(".popup__content");
        this.deleteConfirmationButton = this.cardPopup.querySelector(".popup__button");
        this.originalButtonText =
            this.deleteConfirmationButton.textContent || "";
    }
    setDeleteHandler(handler) {
        this.handleDeleteRequest = handler;
    }
    setLoading(loading) {
        if (loading) {
            this.deleteConfirmationButton.textContent = "Guardando...";
            this.deleteConfirmationButton.disabled = true;
        }
        else {
            this.deleteConfirmationButton.textContent = this.originalButtonText;
            this.deleteConfirmationButton.disabled = false;
        }
    }
    confirmCardElimination() {
        this.deleteConfirmationButton.addEventListener("click", async () => {
            this.setLoading(true);
            try {
                await this.handleDeleteRequest();
                this.close();
            }
            catch (error) {
                console.error("Error al eliminar la tarjeta:", error);
            }
            finally {
                this.setLoading(false);
            }
        });
    }
}
