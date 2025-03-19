import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState, useEffect } from "react";

export default function AddItemModal({
  closeActiveModal,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, imageUrl, weather);
    onAddItemModalSubmit(name, imageUrl, weather);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{" "}
        <input
          className="modal__input"
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
          type="url"
          placeholder="Image URL"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__input modal__input_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="weather"
            required
            onChange={handleWeatherChange}
            value={"hot"}
            checked={weather === "hot"}
          />
          Hot
        </label>
        <label className="modal__input modal__input_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="weather"
            required
            onChange={handleWeatherChange}
            value={"warm"}
            checked={weather === "warm"}
          />
          Warm
        </label>
        <label className="modal__input modal__input_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="weather"
            required
            onChange={handleWeatherChange}
            value={"cold"}
            checked={weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
      <button type="submit" className="modal__submit">
        Add garment
      </button>
    </ModalWithForm>
  );
}
