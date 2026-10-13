import type {InitialCardsType} from '../../../../types/Types.ts'

type CardProps = {
    card: InitialCardsType;
}


export default function ImagePopup (props: CardProps) {
    const {name, link} = props.card
    return (
        <>
        <img alt={name} className="popup__image" src={link} />
          <p className="popup__caption">{name}</p>
        </>
    )
}