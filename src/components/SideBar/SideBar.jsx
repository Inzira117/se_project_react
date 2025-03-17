import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleLogout, handleEditModal }) {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar || "";

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img className="sidebar__avatar" src={userAvatar} alt="Avatar" />
        <p className="sidebar__username">{userName}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          className="chande__profile"
          onClick={handleEditModal}
          type="button"
        >
          Change profile data
        </button>
        <button className="logout" onClick={handleLogout} type="button">
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
