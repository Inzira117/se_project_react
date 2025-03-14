import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfile({
  closeActiveModal,
  activeModal,
  onEditProfileSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const currentUser = useContext(CurrentUserContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  useEffect(() => {
    if (activeModal === "edit") {
      setName(currentUser?.name);
      setImageUrl(currentUser?.imageUrl);
    }
  }, [activeModal, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfileSubmit({ name, imageUrl }).then(() => {
      setName("");
      setImageUrl("");
    });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      closeActiveModal={closeActiveModal}
      isOpen={activeModal === "edit"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="Name" className="modal__label">
        Name{" "}
        <input
          className="modal__input"
          id="Name"
          type="text"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
        <span className="modal__error" id="place-name-error" />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Avatar{" "}
        <input
          className="modal__input"
          id="imageUrl"
          type="url"
          placeholder="Image URL"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
    </ModalWithForm>
  );
}
