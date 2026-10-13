import type {InitialCardsType, PopupConfig} from '../../../types/Types.ts'
import ImagePopup from '../Popup/ImagePopup/ImagePopup.tsx'

type CardProps = {
    card: InitialCardsType;
    handleOpenPopup: (popup: PopupConfig) => void;
}

export default function Card (props: CardProps): React.JSX.Element {

    const {name, link} = props.card
    const {handleOpenPopup} = props

    const imageComponent: PopupConfig = {
    children: <ImagePopup card={props.card} />,
  };
    return ( 
        <>
         <li className="card">
              <img
                className="card__image"
                src={link}
                alt={name}
                onClick={()=>handleOpenPopup(imageComponent)}
              />
              <button
                aria-label="Eliminar tarjeta"
                className="card__delete-button"
                type="button"
              ></button>
              <div className="card__description">
                <h2 className="card__title" >{name}</h2>
                <button
                  aria-label="Botón Me gusta"
                  className="card__like-button"
                  type="button"
                ></button>
              </div>
            </li>
        </>
    )
}