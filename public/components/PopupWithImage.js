import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    image;
    caption;
    constructor(popupSelector, image, caption) {
        super(popupSelector);
        this.image = image;
        this.caption = caption;
    }
    open() {
        const popup = document.querySelector(this.popupSelector);
        const imagePopup = popup.querySelector('.popup__image');
        const imageCaption = popup.querySelector('.popup__caption');
        imagePopup.src = this.image;
        imagePopup.alt = this.caption;
        imageCaption.textContent = this.caption;
        super.open();
    }
}
