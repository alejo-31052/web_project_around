import type FormConfig from "../types/Types.js"

export class FormValidator {
    private formElement: HTMLFormElement;
    private configObject: FormConfig;

    constructor(configObject: FormConfig, formElement:HTMLFormElement){
        this.configObject=configObject
        this.formElement=formElement
    }

    //maneja el estado del boton solamente
    private submitButtonState(validateButton: boolean){

        const submitButton = this.formElement.querySelector(this.configObject.submitButtonSelector) as HTMLButtonElement;
        validateButton===true ? submitButton.classList.add('inactiveButtonClass') : submitButton.classList.remove('inactiveButtonClass');
    }

    //valida los inputs del form
    private validateInput(){
        //seleccion de los inputs del formulario actual
        const formInputs=this.formElement.querySelectorAll(this.configObject.inputSelector);
        let inputsArray = Array.from(formInputs) as HTMLInputElement[];

        inputsArray.forEach((x: HTMLInputElement)=>{
            let formErrorMessage = this.formElement.querySelector(`.popup__error_type_${x.name}`) as HTMLElement; 
             

             x.addEventListener("input", () => {
            let isInvalid = () =>{
        return inputsArray.some(input=> !input.validity.valid
            )
        }
        if (isInvalid()) {
            this.submitButtonState(true)
            formErrorMessage.textContent = x.validationMessage;
            
        } else {
            this.submitButtonState(false)
            formErrorMessage.textContent = '';
            
        }

        })
             
        })

    }

    
    //ejecuta validateInput
    enableValidation(){
        this.validateInput();
    }

    //vuelve a recorrer el array para limpiar los mensajes de error
    
    resetValidation(){
        this.submitButtonState(true)
        const formInputs=this.formElement.querySelectorAll(this.configObject.inputSelector);
        let inputsArray = Array.from(formInputs) as HTMLInputElement[];
        inputsArray.forEach((x: HTMLInputElement)=>{
            let formErrorMessage = this.formElement.querySelector(`.popup__error_type_${x.name}`) as HTMLElement; 
            formErrorMessage.textContent=''
        })
    }
}


