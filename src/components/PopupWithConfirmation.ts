import { Popup } from "./Popup.js";

type DeleteRequest = () => Promise<void>;

export class PopupWithConfirmation extends Popup {
private cardPopup: HTMLDivElement;
deleteConfirmationButton: HTMLButtonElement;
private originalButtonText: string = "";
private handleDeleteRequest: DeleteRequest = async () => {};

constructor(popupSelector: string) {
super(popupSelector);

const popup = document.querySelector(
  this.popupSelector
) as HTMLDivElement;

this.cardPopup = popup.querySelector(
  ".popup__content"
) as HTMLDivElement;

this.deleteConfirmationButton = this.cardPopup.querySelector(
  ".popup__button"
) as HTMLButtonElement;

this.originalButtonText =
  this.deleteConfirmationButton.textContent || "";

}

public setDeleteHandler(handler: DeleteRequest): void {
this.handleDeleteRequest = handler;
}

private setLoading(loading: boolean): void {
if (loading) {
this.deleteConfirmationButton.textContent = "Guardando...";
this.deleteConfirmationButton.disabled = true;
} else {
this.deleteConfirmationButton.textContent = this.originalButtonText;
this.deleteConfirmationButton.disabled = false;
}
}

public confirmCardElimination(): void {
this.deleteConfirmationButton.addEventListener("click", async () => {
this.setLoading(true);


  try {
    await this.handleDeleteRequest();
    this.close();
  } catch (error) {
    console.error("Error al eliminar la tarjeta:", error);
  } finally {
    this.setLoading(false);
  }
});


}
}
