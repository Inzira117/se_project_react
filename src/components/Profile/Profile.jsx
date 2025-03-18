import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleLogout,
  handleEditModal,
  handleCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleLogout={handleLogout}
          handleEditModal={handleEditModal}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
