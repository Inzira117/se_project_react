import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState } from "react";

export default function RegisterModal({
  closeActiveModal,
  isOpen,
  handleRegistration,
  handleLoginClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({
      email,
      password,
      name,
      avatar,
    });
  };

  return (
    <ModalWithForm
      title="Sign up"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email*{" "}
        <input
          className="modal__input"
          id="Email"
          type="email"
          placeholder="Email"
          required
          onChange={handleEmailChange}
          value={email}
        />
        <span className="modal__error" id="place-name-error" />
      </label>
      <label className="modal__label">
        Password*{" "}
        <input
          className="modal__input"
          id="Password"
          type="password"
          placeholder="Password"
          required
          minLength="8"
          maxLength="30"
          onChange={handlePasswordChange}
          value={password}
        />
        <span className="modal__error" id="place-name-error" />
      </label>
      <label className="modal__label">
        Name{" "}
        <input
          className="modal__input"
          id="name"
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
      <label className="modal__label">
        Image{" "}
        <input
          className="modal__input"
          id="avatar"
          type="url"
          placeholder="Image URL"
          required
          onChange={handleImageUrlChange}
          value={avatar}
        />
      </label>
      <div className="madal__buttons">
        <button type="submit" className="modal__submit">
          Sign up
        </button>
        <button type="button" className="modal__btn" onClick={handleLoginClick}>
          Or log in
        </button>
      </div>
    </ModalWithForm>
  );
}
