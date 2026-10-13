export default function EditAvatar () {
    return (
        <form className="popup__form" id="change-profile-picture-form">
            <input
              className="popup__input popup__input_type_name"
              name="name"
              placeholder="Enlace de la imagen"
              type="text"
              minLength={2}
              required
            />
            <span className="popup__error popup__error_type_name"></span>
            <button className="button popup__button" type="submit">Guardar</button>
          </form>
    )
}