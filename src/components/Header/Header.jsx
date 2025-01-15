import "./Header.css";
import Logo from "../../assets/Logo.svg";
import Avatar from "../../assets/Avatar.png";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={Logo} />
      <p className="header__date-location">January 15, Los Angeles</p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={Avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
