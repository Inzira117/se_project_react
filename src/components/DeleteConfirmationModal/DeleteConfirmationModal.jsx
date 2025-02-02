import "./DeleteConfirmationModal.css";
import CloseDel from "../../assets/CloseDel.svg";

export default function DeleteConfirmationModal({
  card,
  closeActiveModal,
  isOpen,
  handleDeleteCard,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__delete-container">
        <button
          className="modal__close-del"
          type="button"
          onClick={closeActiveModal}
        >
          <img src={CloseDel} alt="close button" />
        </button>
        <div className="modal__content-del">
          <h2 className="modal__title-del">
            Are you sure you want to delete this item? <br /> This action is
            Irreversible.
          </h2>
          <div className="modal__buttons">
            <button
              className="modal__confirm"
              type="submit"
              onClick={() => handleDeleteCard(card)}
            >
              Yes, delete item
            </button>
            <button
              className="modal__cancel"
              type="button"
              onClick={closeActiveModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
