import "./DeleteItemModal.jsx";
import { CloseMod } from "../../assets/CloseMod.svg";

export default function DeleteItemModal(closeActiveModal, handleDeleteClick) {
  return (
    <div className="modal__delete">
      <button className="modal__close" type="button" onClick={closeActiveModal}>
        <img src={CloseMod} alt="close button" />
      </button>
      <div className="modal__content">
        <p className="modal__text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          type="button"
          className="delete-confirmation"
          onClick={handleDeleteClick}
        >
          Yes, delete item
        </button>
        <button type="button" className="delete-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
}
