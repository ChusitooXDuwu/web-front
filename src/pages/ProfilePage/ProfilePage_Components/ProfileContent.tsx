import { FC } from "react";
import { Col, Row } from "react-bootstrap";

import styles from "../ProfilePage.module.scss";

import ProfileCard from "../../../components/Profile/ProfileCard";
import AboutMe from "./AboutMe";
import FriendsList from "./FriendsList";
import FavoriteCourts from "./FavouriteCourts";
import SportsList from "./SportLists";
import { useProfile } from "../../../contexts/ProfileContext";

const ProfileContent = () => {
  const { profile } = useProfile(); // Acceder a los datos del perfil

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
          />
        </Col>
      </Row>
      <Row className={styles.profile_content}>
        <Col xs={12} md={4}>
          <FriendsList
            friends={(profile.friends || []).map((friend) => {
              return friend.givenName;
            })}
          />
        </Col>
        <Col xs={12} md={4}>
          <FavoriteCourts courts={profile.favoriteCourts || []} />
        </Col>
        <Col xs={12} md={4}>
          <SportsList sports={profile.sports || []} />
        </Col>
      </Row>
    </>
  );
};

export default ProfileContent;
