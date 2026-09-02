import { Popup } from "./Popup.js"
type SubmitFunction = (values: any) =>Promise<void>;

export  class PopupWithForm extends Popup {
    protected formElement: HTMLFormElement;
    protected handleSubmitEvent: SubmitFunction;
    private originalButtonText: string = "";

    constructor(popupSelector: string, formElement: HTMLFormElement, handleSubmitEvent: SubmitFunction){
        super(popupSelector);
        this.formElement=formElement;
        this.handleSubmitEvent=handleSubmitEvent;

        const submitButton = this.formElement.querySelector( '.popup__button' ) as HTMLButtonElement;
         this.originalButtonText = submitButton.textContent || "";

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

        this.formElement?.addEventListener('submit', async (evt)=>{
            evt.preventDefault();
            const values=this.getInputValues();
            this.setLoading(true)

            try{
            await this.handleSubmitEvent(values);
            this.close();
            }
            catch{
                console.error(`error`)
            }finally{
                this.setLoading(false)
            }
        })  
    }

     public close(){
        this.formElement.reset();
        super.close();
    }

    private setLoading(loading: boolean){
        const submitButton = this.formElement.querySelector('.popup__button') as HTMLButtonElement
        if(loading){
            submitButton.textContent='Guardando...'
        }
        else {
            submitButton.textContent=this.originalButtonText;
        }
    }
}