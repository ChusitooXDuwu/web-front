import { FC } from "react";
import {Col,Row} from "react-bootstrap";

import styles from "../ProfilePage.module.scss"

import ProfileCard from '../../../components/Profile/ProfileCard';
import AboutMe from "./AboutMe";
import FriendsList from "./FriendsList";
import FavoriteCourts from "./FavouriteCourts";
import SportsList from "./SportLists";
import NotificationsPage from "../../NotificationsPage/NotificationsPage";
import HistoryPage from "../../HistoryPage/HistoryPage";
import StatisticsPage from "../../StatisticsPage/StatisticsPage";

interface ProfileContentProps {
    page: string;
    profile: {
      name: string;
      description: string;
      imageUrl: string;
      since: string;
    };
    info: {
      friends: string[];
      favoriteCourts: string[];
      sports: string[];
    };
  }
  
  const ProfileContent: FC<ProfileContentProps> = ({ page, profile, info }) => {
    switch (page) {
      case "profile":
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
                <FriendsList friends={info.friends} />
              </Col>
              <Col xs={12} md={4}>
                <FavoriteCourts courts={info.favoriteCourts} />
              </Col>
              <Col xs={12} md={4}>
                <SportsList sports={info.sports} />
              </Col>
            </Row>
          </>
        );
      case "notifications":
        return <NotificationsPage />;
      case "history":
        return <HistoryPage />;
      case "statistics":
        return <StatisticsPage />;
      default:
        return <p>Página no encontrada</p>;
    }
  };

  export default ProfileContent;