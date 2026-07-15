import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    formElement;
    handleSubmitEvent;
    constructor(popupSelector, formElement, handleSubmitEvent) {
        super(popupSelector);
        this.formElement = formElement;
        this.handleSubmitEvent = handleSubmitEvent;
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
        this.formElement?.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const values = this.getInputValues();
            this.handleSubmitEvent(values);
            this.close();
        });
    }
    close() {
        this.formElement.reset();
        super.close();
    }
}
