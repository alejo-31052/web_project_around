import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    cardPopup;
    deleteConfirmationButton;
    originalButtonText = "";
    handleDeleteRequest;
    constructor(popupSelector, handleDeleteRequest) {
        (super(popupSelector), (this.handleDeleteRequest = handleDeleteRequest));
        const popup = document.querySelector(this.popupSelector);
        this.cardPopup = popup.querySelector(".popup__content");
        this.deleteConfirmationButton = this.cardPopup.querySelector(".popup__button");
        this.originalButtonText = this.deleteConfirmationButton.textContent || "";
    }
    setLoading(loading) {
        if (loading) {
            this.deleteConfirmationButton.textContent = "Guardando...";
        }
        else {
            this.deleteConfirmationButton.textContent = this.originalButtonText;
        }
    }
    confirmCardElimination() {
        this.deleteConfirmationButton.addEventListener("click", async () => {
            this.setLoading(true);
            try {
                await this.handleDeleteRequest();
                this.close();
            }
            catch {
                console.error("error");
            }
            finally {
                this.setLoading(false);
            }
        });
    }
}
