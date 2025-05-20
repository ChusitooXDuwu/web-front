import { Col, Row } from "react-bootstrap";

import styles from "../ProfilePage.module.scss";

import ProfileCard from "../../../components/Profile/ProfileCard";
import AboutMe from "../../../components/UserInformation/AboutMe";
import FriendsList from "../../../components/UserInformation/FriendsList";
import FavoriteCourts from "../../../components/UserInformation/FavouriteCourts";
import SportsList from "../../../components/UserInformation/SportLists";
import { useProfile } from "../../../contexts/ProfileContext";
import { useOutletContext } from "react-router-dom";

interface ProfileOutletContext {
  handleShow: () => void;
  handleShowSportsModal: () => void;
}

const ProfileContent = () => {
  const { profile } = useProfile(); // Acceder a los datos del perfil
  const { handleShow, handleShowSportsModal } =
    useOutletContext<ProfileOutletContext>();
  // Check if profile is null
  if (!profile) {
    return (
      <div className={styles.profile_content}>
        <div className="card p-4 text-center mt-4">
          <h5>Información del perfil no disponible</h5>
        </div>
      </div>
    );
  }

  return (
    <>
      <Row className={styles.profile_content}>
        <Col xs={12} md={4}>
          <ProfileCard
            name={`${profile.givenName} ${profile.lastName}`}
            imageUrl={profile.imageUrl || "/assets/profile_ex.jpg"}
          />
        </Col>
        <Col xs={12} md={8} className="w-full">
          <AboutMe
            text={profile.description}
            since={profile.createdAt || null}
            profile={profile}
          />
        </Col>
      </Row>
      <hr />
      <Row className={(styles.profile_content, "ps-4")}>
        <Col xs={12} md={4}>
          <FriendsList
            handleShowFriendsModal={handleShow}
            friends={profile.friends || []}
          />
        </Col>
        <Col xs={12} md={4}>
          <FavoriteCourts
            courts={profile.favoriteCourts || []}
            isCurrentUser={true}
          />
        </Col>
        <Col xs={12} md={4}>
          <SportsList
            sports={profile.favoriteSports || []}
            isCurrentUser={true}
            openModal={handleShowSportsModal}
          />
        </Col>
      </Row>
    </>
  );
};

export default ProfileContent;
