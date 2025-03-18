import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfile({
  closeActiveModal,
  activeModal,
  handleEdit,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const currentUser = useContext(CurrentUserContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  useEffect(() => {
    if (activeModal === "edit") {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
    }
  }, [activeModal, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
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
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}
