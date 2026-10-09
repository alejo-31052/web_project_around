export class Popup {
    popupSelector;
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
    }
    handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
        }
    };
    setEventListeners() {
        const popupContainer = document.querySelector(this.popupSelector);
        const closeButton = popupContainer.querySelector('.popup__close');
        closeButton.addEventListener('click', () => {
            this.close();
        });
        document.addEventListener('keydown', this.handleEscClose);
        popupContainer.addEventListener('click', (event) => {
            if (event.target === popupContainer) {
                this.close();
            }
        });
    }
    open() {
        document.addEventListener('keydown', this.handleEscClose);
        const popup = document.querySelector(this.popupSelector);
        popup.classList.add('popup_is-opened');
    }
    close() {
        document.removeEventListener('keydown', this.handleEscClose);
        const popup = document.querySelector(this.popupSelector);
        popup.classList.remove('popup_is-opened');
    }
}
