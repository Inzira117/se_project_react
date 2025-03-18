import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import CloseMod from "../../assets/CloseMod.svg";

function ItemModal({ card, closeActiveModal, isOpen, openConfirmationModal }) {
  const currentUser = useContext(CurrentUserContext);
  console.log(isOpen);
  if (!card || !isOpen) {
    return null;
  }

  // Check if the current user owns the item
  const isOwn = card.owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close"
          type="button"
          onClick={closeActiveModal}
        >
          <img src={CloseMod} alt="close button" />
        </button>
        <img
          src={card.imageUrl || ""}
          alt={card.name || ""}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__text">
            <h2 className="modal__caption">{card.name || ""}</h2>
            <p className="modal__weather">Weather: {card.weather || ""}</p>
          </div>
          {isOwn && (
            <button
              type="button"
              className={itemDeleteButtonClassName}
              onClick={() => openConfirmationModal(card)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
