import "./SideBar.css";
import Avatar from "../../assets/Avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img className="sidebar__avatar" src={Avatar} alt="Avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
      <div className="sidebar__buttons">
        <button className="chande__profile" type="button">
          Change profile data
        </button>
        <button className="logout" type="button">
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
