export default function NewCard (): React.JSX.Element {

    return (
        <>
        <form className="popup__form" id="new-card-form">
            <input
              className="popup__input popup__input_type_card-name"
              name="name"
              placeholder="Título"
              required
              type="text"
              minLength={2}
              maxLength={30}
            />
            <span className="popup__error popup__error_type_name"></span>
            <input
              className="popup__input popup__input_type_url"
              name="link"
              placeholder="Enlace a la imagen"
              required
              type="url"
            />
            <span className="popup__error popup__error_type_link"></span>
            <button className="button popup__button" type="submit" disabled>Crear</button>
          </form>
        </>
    )
}