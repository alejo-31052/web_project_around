type CardClick = () => void;
type LikeButton = (isLiked: boolean) => Promise<boolean>;
type DeleteCard = () => void;
import type {InitialCardsType} from "../types/Types.js";



export class Card { 
    private name: string;
    private link: string;
    private _id: string;
    private isLiked: boolean;
    private cardTemplate: HTMLTemplateElement;
    private handleCardClick: CardClick;
    private handleLikeButton: LikeButton;
    private handleDeleteCard: DeleteCard;
    protected element! : HTMLElement;
    
    constructor({name, link, _id, isLiked}: InitialCardsType, cardTemplate: HTMLTemplateElement, handleCardClick: CardClick, handleLikeButton: LikeButton, handleDeleteCard: DeleteCard){
        this.name=name;
        this.link=link;
        this._id=_id;
        this.isLiked=isLiked;
        this.cardTemplate=cardTemplate;
        this.handleCardClick=handleCardClick;
        this.handleLikeButton=handleLikeButton;
        this.handleDeleteCard=handleDeleteCard;
    }

    public cardCreation(): HTMLElement{
        const card = this.cardTemplate.content.querySelector('.card')?.cloneNode(true) as HTMLElement;
        const cardName = card.querySelector('.card__title') as HTMLElement;
        const cardImage = card.querySelector('.card__image') as HTMLImageElement;

        cardName.textContent=this.name;
        cardImage.alt=this.name;
        cardImage.src=this.link
        card.id=this._id;
        this.element=card;

        this.like();
        this.unlike();
        this.PoPupImage();
        this.likeButtonStatus();
        this.deleteCard();

        return card;
    }

    private PoPupImage(): void{
        const imageElement = this.element.querySelector('.card__image') as HTMLImageElement; 
        imageElement.addEventListener('click', this.handleCardClick)
    }

    private likeButtonStatus(): void {
    const cardLikeButton = this.element.querySelector(
        '.card__like-button'
    ) as HTMLButtonElement;

    cardLikeButton.addEventListener('click', async () => {
        const answer = await this.handleLikeButton(this.isLiked);
        this.isLiked = answer;
        
        if (this.isLiked) {
            cardLikeButton.classList.add('card__like-button_is-active');
        } else {
            cardLikeButton.classList.remove('card__like-button_is-active');
        }
    });
}
    private like (): void {
        const cardLikeButton = this.element.querySelector('.card__like-button') as HTMLButtonElement;
        if(this.isLiked){
            cardLikeButton.classList.add('card__like-button_is-active')
        }
    }
    private unlike (): void {
         const cardLikeButton = this.element.querySelector('.card__like-button') as HTMLButtonElement;
        if(!this.isLiked){
            cardLikeButton.classList.remove('card__like-button_is-active')
        }
    }
    private deleteCard(): void{
        const deleteButton = this.element.querySelector('.card__delete-button') as HTMLButtonElement;
        deleteButton.addEventListener('click',()=>{
             this.handleDeleteCard()
        })
    }

    public cardRemoval(): void {
        this.element.remove();
    }


}