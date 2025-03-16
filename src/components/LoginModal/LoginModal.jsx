import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({ closeActiveModal, isOpen, handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({
      email,
      password,
    });
  };
  return (
    <ModalWithForm
      title="Login"
      isOpen={isOpen}
      buttonText="Log in"
      secondButtonText="or Register"
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label>
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label>
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          minLength="8"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
    </ModalWithForm>
  );
}
