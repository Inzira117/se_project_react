import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import Auth from "../../utils/auth.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { defaultClothingItems } from "../../utils/constants";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { coordinates, APIkey } from "../../utils/constants";
import { useEffect, useState } from "react";
import { getItems, addItem, deleteItem } from "../../utils/api.js";

const auth = new Auth({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

function App() {
  const [weatherData, setWeatherData] = useState({
    type: " ",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: true,
    condition: "",
  });

  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentUser, setCurrentUser] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const openConfirmationModal = (card) => {
    setActiveModal("confirm");
    setCardToDelete(card);
  };

  const handleDeleteCard = (cardToDelete) => {
    return deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((item) => item._id !== cardToDelete._id)
        );
        setCardToDelete({});
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    return addItem({ name, imageUrl, weather })
      .then((values) => {
        setClothingItems([values, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    if (name && avatar && email && password) {
      auth
        .registerUser({ name, avatar, email, password })
        .then((res) => {
          return auth.loginUser({ email, password });
        })
        .then((data) => {
          if (data.token) {
            localStorage.setItem("jwt", data.token);
            return auth.verifyToken(data.token);
          }
        })
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          closeActiveModal();
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleLogin = ({ email, password }) => {
    if (email && password) {
      auth
        .loginUser({ email, password })
        .then((token) => {
          return auth.verifyToken(token);
        })
        .then((currentUser) => {
          setCurrentUser(currentUser);
          closeActiveModal();
          setIsLoggedIn(true);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleLogout = () => {
    closeActiveModal();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setClothingItems([]);
    setSelectedCard(null);
    localStorage.removeItem("jwt");
    navigate("/");
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .verifyToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
          api
            .getCards(token)
            .then((items) => {
              setClothingItems(items);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser({});
          setClothingItems([]);
        });
    } else {
      setIsLoggedIn(false);
      setCurrentUser({});
      setClothingItems([]);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              isLoggedIn={isLoggedIn}
            />
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
                    handleLogoutClick={handleLogout}
                    closeActiveModal={closeActiveModal}
                  />
                }
              />
            </Routes>

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
            <RegisterModal
              onCardClick={handleRegisterClick}
              isOpen={activeModal === "register"}
              closeActiveModal={closeActiveModal}
              handleRegistration={handleRegistration}
              handleLogin={handleLogin}
            />
            <LoginModal
              onCardClick={handleLoginClick}
              isOpen={activeModal === "login"}
              closeActiveModal={closeActiveModal}
              handleLogin={handleLogin}
            />
            <Footer />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
