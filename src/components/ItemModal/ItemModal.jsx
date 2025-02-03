import "./ItemModal.css";
import CloseMod from "../../assets/CloseMod.svg";

function ItemModal({ card, closeActiveModal, isOpen, openConfirmationModal }) {
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
          <button
            type="button"
            className="modal__delete"
            onClick={() => openConfirmationModal(card)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
