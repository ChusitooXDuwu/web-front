import React, { FC } from "react";
import styles from "./SportCard.module.scss"; 
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import SportEntity from "../../entities/SportEntity";
import { ReactComponent as BasketballIcon } from "../../icons/basketballSVG.svg";
import FieldDetailEntity from "../../entities/FieldDetailEntity";
interface FieldDetailCardProps {
  sport: SportEntity;
}


const mockData: FieldDetailEntity = {
  id: "abc",
  field_name: "Campo de Futbol",
  field_rating: 4.5,
  phone_number: "123456789",
  address: "Calle 123",
  opening_time: "8:00 - 20:00",
  image_url: "/assets/stock-bb-court.jpeg"
};
const FieldDetailCard: FC<FieldDetailCardProps> = ({ sport }) => {
  return (
    <Card style={{ width: "18rem", backgroundColor: "#60508C" }}>
      <Row lg={3} md={3} sm={2} xs={1} className="gy-3 justify-content-left">
      <img src={mockData.image_url} alt="Campo de futbol" className={styles.field_image}/>
      <Col className="d-flex justify-content-center">
        
      </Col>
    </Row>

    </Card>
  );
};

export default FieldDetailCard;