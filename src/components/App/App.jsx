import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { defaultClothingItems } from "../../utils/constants";
import { Routes, Route } from "react-router-dom";
import { coordinates, APIkey } from "../../utils/constants";
import { useEffect, useState } from "react";
import { getItems, addItem, deleteItem } from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: " ",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: true,
    condition: "",
  });

  const [activeModal, setActiveModal] = useState();
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [cardToDelete, setCardToDelete] = useState({});

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const openConfirmationModal = (card) => {
    setActiveModal("confirm");
    setCardToDelete(card);
  };

  const handleDeleteCard = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    return addItem({ name, imageUrl, weather })
      .then((values) => {
        setClothingItems([...clothingItems, values]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Failed to fetch clothing items:", error);
        setClothingItems([]);
      });
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  closeActiveModal={closeActiveModal}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === "preview"}
          openConfirmationModal={openConfirmationModal}
        />
        <DeleteConfirmationModal
          card={cardToDelete}
          isOpen={activeModal === "confirm"}
          closeActiveModal={closeActiveModal}
          handleDeleteCard={handleDeleteCard}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
