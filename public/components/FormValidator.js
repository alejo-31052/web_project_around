export class FormValidator {
    formElement;
    configObject;
    constructor(configObject, formElement) {
        this.configObject = configObject;
        this.formElement = formElement;
    }
    //maneja el estado del boton solamente
    submitButtonState(validateButton) {
        const submitButton = this.formElement.querySelector(this.configObject.submitButtonSelector);
        if (validateButton) {
            submitButton.disabled = true;
            submitButton.classList.add(this.configObject.inactiveButtonClass);
        }
        else {
            submitButton.disabled = false;
            submitButton.classList.remove(this.configObject.inactiveButtonClass);
        }
    }
    //valida los inputs del form
    validateInput() {
        //seleccion de los inputs del formulario actual
        const formInputs = this.formElement.querySelectorAll(this.configObject.inputSelector);
        let inputsArray = Array.from(formInputs);
        inputsArray.forEach((x) => {
            let formErrorMessage = this.formElement.querySelector(`.popup__error_type_${x.name}`);
            x.addEventListener("input", () => {
                let isInvalid = () => {
                    return inputsArray.some(input => !input.validity.valid);
                };
                if (isInvalid()) {
                    this.submitButtonState(true);
                    formErrorMessage.textContent = x.validationMessage;
                }
                else {
                    this.submitButtonState(false);
                    formErrorMessage.textContent = '';
                }
            });
        });
    }
    //ejecuta validateInput
    enableValidation() {
        this.validateInput();
    }
    //vuelve a recorrer el array para limpiar los mensajes de error
    resetValidation() {
        this.submitButtonState(true);
        const formInputs = this.formElement.querySelectorAll(this.configObject.inputSelector);
        let inputsArray = Array.from(formInputs);
        inputsArray.forEach((x) => {
            let formErrorMessage = this.formElement.querySelector(`.popup__error_type_${x.name}`);
            formErrorMessage.textContent = '';
        });
    }
}
