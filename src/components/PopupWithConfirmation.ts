import { Popup } from "./Popup.js";
type DeleteRequest = () => Promise<void>;

export class PopupWithConfirmation extends Popup {
  private cardPopup: HTMLDivElement;
  deleteConfirmationButton: HTMLButtonElement;
  private originalButtonText: string = "";
  handleDeleteRequest: DeleteRequest;

  constructor(popupSelector: string, handleDeleteRequest: DeleteRequest) {
    (super(popupSelector), (this.handleDeleteRequest = handleDeleteRequest));

    const popup = document.querySelector(this.popupSelector) as HTMLDivElement;
    this.cardPopup = popup.querySelector(".popup__content") as HTMLDivElement;
    this.deleteConfirmationButton = this.cardPopup.querySelector(
      ".popup__button",
    ) as HTMLButtonElement;
    this.originalButtonText = this.deleteConfirmationButton.textContent || "";
  }

  private setLoading(loading: boolean) {
    if (loading) {
      this.deleteConfirmationButton.textContent = "Guardando...";
    } else {
      this.deleteConfirmationButton.textContent = this.originalButtonText;
    }
  }

  public confirmCardElimination(): void {
    this.deleteConfirmationButton.addEventListener("click", async () => {
      this.setLoading(true);
      try {
        await this.handleDeleteRequest();
        this.close();
      } catch {
        console.error("error");
      } finally {
        this.setLoading(false);
      }
    });
  }
}
