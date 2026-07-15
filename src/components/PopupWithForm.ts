import { Popup } from "./Popup.js"
type SubmitFunction = (values: any) =>void;

export  class PopupWithForm extends Popup {
    protected formElement: HTMLFormElement;
    protected handleSubmitEvent: SubmitFunction;

    constructor(popupSelector: string, formElement: HTMLFormElement, handleSubmitEvent: SubmitFunction){
        super(popupSelector);
        this.formElement=formElement;
        this.handleSubmitEvent=handleSubmitEvent;

    }

    private getInputValues(): Object{
        const valueList = this.formElement.querySelectorAll('.popup__input');
        const objectValues: Record<string, string> = {};
        valueList.forEach((value)=>{
            const input = value as HTMLInputElement
            objectValues[input.name]=input.value
        })
        return objectValues
    }

    public setEventListeners(): void {
        super.setEventListeners();

        this.formElement?.addEventListener('submit', (evt)=>{
            evt.preventDefault();
            const values=this.getInputValues();
            this.handleSubmitEvent(values);
            this.close();
        })  
    }

     public close(){
        this.formElement.reset();
        super.close();
    }
}