import "./ModalWithForm.css";

import Close from "../../assets/Close.svg";

function ModalWithForm({
  children,
  name,
  title,
  closeActiveModal,
  isOpen,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close"
          type="button"
          onClick={closeActiveModal}
        >
          <img src={Close} alt="close button" />
        </button>
        <form className="modal__form" onSubmit={onSubmit} name={name}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
