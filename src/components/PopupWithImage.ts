import { Popup } from "./Popup.js";

export class PopupWithImage  extends Popup {
    private image: string;
    private caption: string;

    constructor(popupSelector: string, image: string, caption: string){
        super(popupSelector);

        this.image=image;
        this.caption=caption;
    }

    public open(){

        const popup = document.querySelector(this.popupSelector) as HTMLDivElement;
        const imagePopup = popup!.querySelector('.popup__image') as HTMLImageElement;
        const imageCaption = popup!.querySelector('.popup__caption') as HTMLElement;

        imagePopup.src=this.image;
        imagePopup.alt=this.caption;
        imageCaption.textContent=this.caption;

        super.open()
    }
}