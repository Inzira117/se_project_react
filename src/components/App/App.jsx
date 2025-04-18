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
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import Auth from "../../utils/auth.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import ProtectedRoute from "../ProtectedRout/ProtectedRoute.jsx";
import Api from "../../utils/api.js";

import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { coordinates, APIkey, baseUrl } from "../../utils/constants";
import { useEffect, useState } from "react";

const api = new Api({
  baseUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const auth = new Auth({
  baseUrl: baseUrl,
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
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleEditModal = () => {
    setActiveModal("edit");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  console.log(activeModal, selectedCard);
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
    const handleOverlay = (e) => {
      // that's why you should have a `modal` class name in each modal to be able to universally handle the overlay click
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [activeModal]);

  const openConfirmationModal = (card) => {
    setActiveModal("confirm");
    setCardToDelete(card);
  };

  const handleDeleteCard = (cardToDelete) => {
    const token = localStorage.getItem("jwt");
    return api
      .deleteItem(cardToDelete._id, token)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((item) => item._id !== cardToDelete._id)
        );
        setCardToDelete({});
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleAddItemModalSubmit = (name, imageUrl, weather) => {
    api
      .addItem(name, imageUrl, weather)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        console.log(res);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    if (name && avatar && email && password) {
      auth
        .registerUser({ name, avatar, email, password })
        .then((res) => {
          console.log("Registration response:", res);
          return auth.loginUser({ email, password });
        })
        .then((token) => {
          console.log("Login response:", token);
          localStorage.setItem("jwt", token.jwt);
          return auth.verifyToken(token.jwt);
        })
        .then((userData) => {
          console.log("use data", userData);
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
          if (!token) {
            throw new Error("No token received from login");
          }
          localStorage.setItem("jwt", token.jwt);
          return auth.verifyToken(token.jwt);
        })
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          closeActiveModal();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEdit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    if (name && avatar) {
      api
        .editUser(token, name, avatar)
        .then((res) => {
          closeActiveModal();
          setCurrentUser(res);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    closeActiveModal();
    setIsLoggedIn(false);
    setCurrentUser(null);

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
    api
      .getCards()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => console.error(err));

    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .verifyToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
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
                    isLoggedIn={isLoggedIn}
                    handleCardLike={handleCardLike}
                    onClick={handleLoginClick}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      handleLogout={handleLogout}
                      handleEditModal={handleEditModal}
                      closeActiveModal={closeActiveModal}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <AddItemModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            <ItemModal
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
              isOpen={activeModal === "register"}
              closeActiveModal={closeActiveModal}
              handleRegistration={handleRegistration}
              handleLogin={handleLogin}
              handleLoginClick={handleLoginClick}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              closeActiveModal={closeActiveModal}
              handleRegisterClick={handleRegisterClick}
              handleLogin={handleLogin}
            />
            <EditProfileModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "edit"}
              onCardClick={handleEditModal}
              handleEdit={handleEdit}
              isLoading={isLoading}
            />
            <Footer />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
