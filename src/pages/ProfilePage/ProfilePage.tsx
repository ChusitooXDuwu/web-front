import React, { FC ,useState,useEffect } from 'react';
import { useLocation , Outlet} from "react-router-dom";
import SideBar from '../../components/Profile/SideBar';
import { getSidebarItems } from '../../components/Profile/getSidebarItems';
import {Container,Col,Row} from "react-bootstrap";
import ProfileContent from './ProfilePage_Components/ProfileContent';

interface ProfilePageProps {
  isOwner: boolean;
}

const profile = {
  name: "Armando Paredes",
  description: "Description de una persona super mega hiper i",
  imageUrl: "/assets/profile_ex.jpg",
  since:"2009"
};

const info = {
  friends: ["Ernesto Pérez", "Ernesto Pérez", "Ernesto Pérez"],
  favoriteCourts: ["SUBA", "suba", "suba"],
  sports: ["Basket", "Basket", "Basket"]
};

const ProfilePage: FC<ProfilePageProps> = ({ isOwner }) => {
  const location = useLocation();
  const [page, setPage] = useState(location.pathname.split("/").pop() || "profile");
  const [sidebarItems, setSidebarItems] = useState(() => getSidebarItems(isOwner, page));

  useEffect(() => {
    setPage(location.pathname.split("/").pop() || "profile");
    setSidebarItems(getSidebarItems(isOwner, page));
  }, [location.pathname, isOwner]);

  return (

    <Container fluid >
      <Row>
        {/* Texto a emplasar*/}
        <Col md={9} style={{ backgroundColor: "white" }}>
          <Outlet/>
        </Col> 
           {/* Texto a emplasar*/}
        <Col md={3} className="overflow-y:auto">
          <SideBar items={sidebarItems} isOwner={isOwner} profile={{name: profile.name, imageUrl: profile.imageUrl}} />
        </Col>  
      </Row>
    </Container>
  );
}



export default ProfilePage;
