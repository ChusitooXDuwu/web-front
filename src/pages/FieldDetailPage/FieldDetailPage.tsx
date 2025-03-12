import React, { FC } from 'react';
import styles from './FieldDetailPage.module.scss';
import { Breadcrumb, Container, Row, Col} from "react-bootstrap";
import FieldDetailCardComponent from "../../components/FieldDetailCardComponent/FieldDetailCardComponent";
import { Link } from "react-router-dom";
import FieldDetailEntity from "../../entities/FieldDetailEntity";
import BookingCard from "../../components/BookingCard/BookingCard";
import BookedEventEntity from "../../entities/BookedEventEntity";


// TODO REPLACE WITH API FETCH


const mockData: FieldDetailEntity = {
  id: "abc",
  field_name: "Campo de Futbol",
  field_rating: 3,
  phone_number: "123456789",
  address: "Calle 123",
  opening_time: "8:00 - 20:00",
  image_url: "/assets/basket_horizontal.jpg"
};

const mockDataBooking: BookedEventEntity = {
  id: "abc",
  startDateTime: new Date(),
  endDateTime: new Date(),
  locationName: "Futbol 8 la 80",
  address: "AC 80 con autopista norte",
  sportName: "Fúbo",
  imageUrl: null,
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
      
        <FieldDetailCardComponent field={mockData} />
        
    </Row>
    <Row className="justify-content-center">
        <div className={styles.alignedSection} >
          <h2>Partidos disponibles en esta cancha:</h2>
          {bookingArray.map((item, index) => (
          <Row key={index} className={`mb-2 ${styles.card_row}`}>
            <BookingCard bookedEvent={mockDataBooking} />
          </Row>
      ))}
        </div>
    </Row>
    
    
    
    
    

    
  </Container>
  );
};

export default FieldDetailPage;
