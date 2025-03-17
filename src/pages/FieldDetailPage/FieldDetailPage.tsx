import React, { FC } from 'react';
import styles from './FieldDetailPage.module.scss';
import { Breadcrumb, Container, Row, Col} from "react-bootstrap";
import FieldDetailCardComponent from "../../components/FieldDetailCardComponent/FieldDetailCardComponent";
import { Link } from "react-router-dom";
import FieldDetailEntity from "../../entities/FieldDetailEntity";
import BookingCard from "../../components/BookingCard/BookingCard";
import GameCardComponent from '../../components/GameCardComponent/GameCardComponents';
import { EventInterface } from '../../entities/EventEntity';

// TODO REPLACE WITH API FETCH


const mockData: FieldDetailEntity = {
  id: "abc",
  field_name: "Campo de Futbol",
  field_rating: 3,
  phone_number: "123456789",
  address: "Calle 123",
  opening_time: "8:00 - 20:00",
  image_url: "/assets/basket_horizontal.jpg",
  isBooking: false,
  field_type: "field"
};

const mockEvent: EventInterface = {
    id: "1",
    startTime: new Date(),
    endTime: new Date(),
    currentPlayers: 4,
    maxPlayers: 5,
    sport: { id: "1", name: "Baloncesto", availableFields: 2, availableBookings: 5 },
    field: {
      id: "1",
      name: "Cancha de baloncesto",
      address: "Calle 123",
      city: { id: "1", name: "Medellín" },
      sports: [{ id: "1", name: "Baloncesto", availableFields: 2, availableBookings: 5 }],
      createdById: "1",
    },
    image: null,
  };




interface FieldDetailPageProps {}

const FieldDetailPage: FC<FieldDetailPageProps> = () => {
  const bookingArray: any[] = [1, 1, 1, 1, 1];
  return (
  <Container
    fluid
    className={`main_content_container ${styles.main_content}`}
  >
    <Row className={`pt-2 ${styles.title_row}`}>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
          Inicio
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/fields" }}>
          Canchas
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{mockData.field_name}</Breadcrumb.Item>
      </Breadcrumb>
    </Row>
    <Row lg={3} md={3} sm={2} xs={1} className="gy-3 justify-content-center">
      
        <FieldDetailCardComponent field={mockData} price ={4} />
        
    </Row>
    <Row className="justify-content-center">
        <div className={styles.alignedSection} >
          <h2>Partidos disponibles en esta cancha:</h2>
          <Row lg={3} md={2} sm={2} xs={1} className="gy-2">
          {bookingArray.map((item, index) => (
            
          <Col key={index} className="d-flex justify-content-center">
            
            <GameCardComponent  event={mockEvent}/>
          </Col>
      ))}
          </Row>
        </div>
    </Row>
    
    
    
    
    

    
  </Container>
  );
};

export default FieldDetailPage;
