import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    formElement;
    handleSubmitEvent;
    originalButtonText = "";
    constructor(popupSelector, formElement, handleSubmitEvent) {
        super(popupSelector);
        this.formElement = formElement;
        this.handleSubmitEvent = handleSubmitEvent;
        const submitButton = this.formElement.querySelector('.popup__button');
        this.originalButtonText = submitButton.textContent || "";
    }
    getInputValues() {
        const valueList = this.formElement.querySelectorAll('.popup__input');
        const objectValues = {};
        valueList.forEach((value) => {
            const input = value;
            objectValues[input.name] = input.value;
        });
        return objectValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement?.addEventListener('submit', async (evt) => {
            evt.preventDefault();
            const values = this.getInputValues();
            this.setLoading(true);
            try {
                await this.handleSubmitEvent(values);
                this.close();
            }
            catch {
                console.error(`error`);
            }
            finally {
                this.setLoading(false);
            }
        });
    }
    close() {
        this.formElement.reset();
        super.close();
    }
    setLoading(loading) {
        const submitButton = this.formElement.querySelector('.popup__button');
        if (loading) {
            submitButton.textContent = 'Guardando...';
        }
        else {
            submitButton.textContent = this.originalButtonText;
        }
    }
}
