import { useState } from 'react'
import { Main } from './components/Main/Main'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'



function App() {
  return (
    <>
      <div className="page__content">
      < Header/>
      < Main/>
      < Footer/>
      

    {/*Form del perfil*/}
      <div className="popup" id="edit-popup">
        <div className="popup__content">
          <button
            aria-label="Cerrar ventana emergente"
            className="popup__close"
            type="button"
          ></button>
          <h3 className="popup__title">Editar perfil</h3>
          <form className="popup__form" id="edit-profile-form">
            <input
              className="popup__input popup__input_type_name"
              name="name"
              placeholder="Nombre"
              type="text"
              minLength={2}
              maxLength={40}
              required
            />
            <span className="popup__error popup__error_type_name"></span>
            <input
              className="popup__input popup__input_type_description"
              name="description"
              placeholder="Acerca de mí"
              type="text"
              required
              minLength={2}
              maxLength={200}
            />
            <span className="popup__error popup__error_type_description"></span>
            <button className="button popup__button" type="submit">Guardar</button>
          </form>
        </div>
      </div>

      {/*Form de confirmacion de eliminador de tarjeta*/}
      <div className="popup" id="delete-confirmation-popup">
        <div className="popup__content popup__content-deletion-confirm">
          <form className='popup__form'>
          <button
            aria-label="Cerrar ventana emergente"
            className="popup__close"
            type="submit"
          ></button>
          <h3 className="popup__title">¿Estas Seguro/a?</h3>
            <button className="button popup__button" type="submit">Si</button>
          </form>
        </div>
      </div>

      {/*Form de cambio de foto de perfil*/}

<div className="popup" id="change-profile-picture-popup">
        <div className="popup__content">
          <button
            aria-label="Cerrar ventana emergente"
            className="popup__close"
            type="button"
          ></button>
          <h3 className="popup__title">Cambiar foto de perfil</h3>
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
        </div>
      </div>

      {/*div del form de la nueva tarjeta*/}
      <div className="popup" id="new-card-popup">
        <div className="popup__content">
          <button
            aria-label="Cerrar ventana emergente"
            className="popup__close"
            type="button"
          ></button>
          <h3 className="popup__title">Nuevo lugar</h3>
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
        </div>
      </div>
      <div className="popup" id="image-popup">
        <div className="popup__content popup__content_content_image">
          <button
            aria-label="Cerrar ventana emergente"
            className="popup__close"
            type="button"
          ></button>
          <img alt="" className="popup__image" src="#" />
          <p className="popup__caption"></p>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
