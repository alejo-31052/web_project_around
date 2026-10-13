type PopupProps = {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: ()=>void
};

export default function Popup(props: PopupProps) {
     const {title, children, isOpen, onClose} = props;
    return (
       <>
       <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`} >
        <div className={`popup__content ${!title ? 'popup__content_content_image' : ''}`}>
          <button
           aria-label="Cerrar ventana emergente"
           className="popup__close"
           type="submit"
           onClick={onClose}>            
            
          </button>
          <h3 className="popup__title">{title}</h3>
          {children}
        </div>
      </div>
       </>
    )
}