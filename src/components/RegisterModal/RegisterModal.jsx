import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState } from "react";

export default function RegisterModal({
  closeActiveModal,
  isOpen,
  handleRegistration,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({
      email,
      password,
      name,
      imageUrl,
    });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="Email" className="modal__label">
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
      <label htmlFor="Password" className="modal__label">
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
        Image{" "}
        <input
          className="modal__input"
          id="imageUrl"
          type="url"
          placeholder="Image URL"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
        <button type="button" className="modal__btn" onClick={handleSubmit}>
          {" "}
          or Log In
        </button>
        {/* <div className="modal__buttons">
          <button
            type="submit"
            className="modal__submit"
            onClick={handleSubmit}
          >
            Sign Up{" "}
          </button>
          <button type="button" className="modal__btn" onClick={handleSubmit}>
            {" "}
            or Log In
          </button>
        </div> */}
      </label>
    </ModalWithForm>
  );
}
