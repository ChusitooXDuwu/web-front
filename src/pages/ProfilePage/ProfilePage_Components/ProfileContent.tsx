import { FC } from "react";
import {Col,Row} from "react-bootstrap";

import styles from "../ProfilePage.module.scss"

import ProfileCard from '../../../components/Profile/ProfileCard';
import AboutMe from "./AboutMe";
import FriendsList from "./FriendsList";
import FavoriteCourts from "./FavouriteCourts";
import SportsList from "./SportLists";
import { useProfile } from "../../../contexts/ProfileContext";

const ProfileContent = () => {
    
        const { profile } = useProfile(); // Acceder a los datos del perfil
        return (
          <>
            <Row className={styles.profile_content}>
              <Col xs={12} md={4}>
                <ProfileCard name={profile.name} imageUrl={profile.imageUrl} />
              </Col>
              <Col xs={12} md={8} className="w-full">
                <AboutMe text={profile.description} since={profile.since} />
              </Col>
            </Row>
            <Row className={styles.profile_content}>
              <Col xs={12} md={4}>
                <FriendsList friends={profile.friends} />
              </Col>
              <Col xs={12} md={4}>
                <FavoriteCourts courts={profile.favoriteCourts} />
              </Col>
              <Col xs={12} md={4}>
                <SportsList sports={profile.sports} />
              </Col>
            </Row>
          </>
        );
   
   
  };

  export default ProfileContent;