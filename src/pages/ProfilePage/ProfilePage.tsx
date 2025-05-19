import React, { FC, useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import SideBar from "../../components/Profile/SideBar";
import { GetSidebarItems } from "../../components/Profile/getSidebarItems";
import { Container, Col, Row } from "react-bootstrap";
import { useProfile } from "../../contexts/ProfileContext";
import { useIntl } from "react-intl";

interface ProfilePageProps {
  isOwner: boolean;
}

const ProfilePage: FC<ProfilePageProps> = ({ isOwner }) => {
  const location = useLocation();
  const { profile } = useProfile();
  const { formatMessage } = useIntl();
  const [page, setPage] = useState(
    location.pathname.split("/").pop() || "profile"
  );
  const [sidebarItems, setSidebarItems] = useState(() =>
    GetSidebarItems(isOwner, page, formatMessage)
  );

  useEffect(() => {
    const currentPage = location.pathname.split("/").pop() || "profile";
    setPage(currentPage);
    setSidebarItems(GetSidebarItems(isOwner, currentPage, formatMessage));
  }, [location.pathname, isOwner, formatMessage]);

  return (
    <Container
      fluid
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Row style={{ flex: 1 }}>
        <Col md={9} style={{ backgroundColor: "white" }} className="px-4">
          <Outlet></Outlet>
        </Col>
        <Col md={3} className="overflow-y:auto">
          <SideBar
            items={sidebarItems}
            isOwner={isOwner}
            profile={{
              name: `${profile?.givenName} ${profile?.lastName}` || "?",
              imageUrl: profile?.imageUrl || "/assets/profile_ex.jpg",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
