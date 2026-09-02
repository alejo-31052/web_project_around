export class Card {
    name;
    link;
    _id;
    isLiked;
    cardTemplate;
    handleCardClick;
    handleLikeButton;
    handleDeleteCard;
    element;
    constructor({ name, link, _id, isLiked }, cardTemplate, handleCardClick, handleLikeButton, handleDeleteCard) {
        this.name = name;
        this.link = link;
        this._id = _id;
        this.isLiked = isLiked;
        this.cardTemplate = cardTemplate;
        this.handleCardClick = handleCardClick;
        this.handleLikeButton = handleLikeButton;
        this.handleDeleteCard = handleDeleteCard;
    }
    cardCreation() {
        const card = this.cardTemplate.content.querySelector('.card')?.cloneNode(true);
        const cardName = card.querySelector('.card__title');
        const cardImage = card.querySelector('.card__image');
        cardName.textContent = this.name;
        cardImage.alt = this.name;
        cardImage.src = this.link;
        card.id = this._id;
        this.element = card;
        this.like();
        this.unlike();
        this.PoPupImage();
        this.likeButtonStatus();
        this.deleteCard();
        return card;
    }
    PoPupImage() {
        const imageElement = this.element.querySelector('.card__image');
        imageElement.addEventListener('click', this.handleCardClick);
    }
    likeButtonStatus() {
        const cardLikeButton = this.element.querySelector('.card__like-button');
        cardLikeButton.addEventListener('click', async () => {
            const answer = await this.handleLikeButton(this.isLiked);
            this.isLiked = answer;
            if (this.isLiked) {
                cardLikeButton.classList.add('card__like-button_is-active');
            }
            else {
                cardLikeButton.classList.remove('card__like-button_is-active');
            }
        });
    }
    like() {
        const cardLikeButton = this.element.querySelector('.card__like-button');
        if (this.isLiked) {
            cardLikeButton.classList.add('card__like-button_is-active');
        }
    }
    unlike() {
        const cardLikeButton = this.element.querySelector('.card__like-button');
        if (!this.isLiked) {
            cardLikeButton.classList.remove('card__like-button_is-active');
        }
    }
    deleteCard() {
        const deleteButton = this.element.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', () => {
            this.handleDeleteCard();
        });
    }
    cardRemoval() {
        this.element.remove();
    }
}
