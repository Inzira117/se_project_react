import "./Header.css";
import { useContext } from "react";
import Logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Header({
  isLoggedIn,
  handleAddClick,
  weatherData,
  handleRegisterClick,
  handleLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.imageUrl || "";

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={Logo} alt="logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {!isLoggedIn && (
        <>
          <button
            type="button"
            onClick={handleRegisterClick}
            className="header__add-clothes-btn"
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={handleLoginClick}
            className="header__add-clothes-btn"
          >
            Log in
          </button>
        </>
      )}
      {isLoggedIn && (
        <>
          <button
            type="button"
            onClick={handleAddClick}
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{userName}</p>
              <img src={userAvatar} alt="Avatar" className="header__avatar" />
            </div>
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
