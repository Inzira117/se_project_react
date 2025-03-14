import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import CloseMod from "../../assets/CloseMod.svg";

function ItemModal({ card, closeActiveModal, isOpen, openConfirmationModal }) {
  const currentUser = useContext(CurrentUserContext);

  if (!card || isOpen !== "preview") {
    return null;
  }

  // Check if the current user owns the item
  const isOwn =
    currentUser && card && card.owner && currentUser._id === card.owner;

  const itemDeleteModal = `modal__delete-button ${
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
          src={card.imageUrl || card.link}
          alt="card image"
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__text">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              type="button"
              className={itemDeleteModal}
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
