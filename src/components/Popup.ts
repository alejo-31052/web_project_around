export class Popup {
    protected popupSelector: string;

    constructor(popupSelector: string){
        this.popupSelector=popupSelector;
    }

    private handleEscClose=(event: KeyboardEvent)=>{
        if(event.key==='Escape'){
            this.close();
        }
    }
    public setEventListeners(){

        
        const popupContainer = document.querySelector(this.popupSelector) as HTMLDivElement;
        const closeButton = popupContainer.querySelector('.popup__close') as HTMLButtonElement;

        closeButton.addEventListener('click', ()=>{
            this.close();

        })
        document.addEventListener('keydown', this.handleEscClose);

       popupContainer.addEventListener('click', (event) => {
    if (event.target === popupContainer) {
        this.close();
    }
});
    }
    public open(): void{
        const popup = document.querySelector(this.popupSelector) as HTMLElement;
        popup.classList.add('popup_is-opened')
    }
    public close(): void{
        const popup = document.querySelector(this.popupSelector) as HTMLElement;
        popup.classList.remove('popup_is-opened')
    }
}   