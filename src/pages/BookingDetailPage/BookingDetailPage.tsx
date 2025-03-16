import React, { FC, useState } from 'react';
import styles from './BookingDetailPage.module.scss';
import { Breadcrumb, Container, Row, Col, Button, Form } from "react-bootstrap";
import FieldDetailCardComponent from "../../components/FieldDetailCardComponent/FieldDetailCardComponent";
import { Link } from "react-router-dom";
import FieldDetailEntity from "../../entities/FieldDetailEntity";
import BookingCard from "../../components/BookingCard/BookingCard";
import GameCardComponent from '../../components/GameCardComponent/GameCardComponents';
import { EventEntity } from '../../entities/Entities';
import UserEntity from '../../entities/UserEntity';
import { ReactComponent as ProfileIcon } from "../../icons/profileIcon.svg";


const mockPlayer: UserEntity = {
  id: "1",
  name: "Juan",
  email: "j.name@uniandes.edu.co",
  gender: "Masculino",
  favorite_sports: "Baloncesto",
  phone_number: "123456789",
  image_url: "/assets/basket_horizontal.jpg"
}

const mockEvent: EventEntity = {
  id: "1",
  startTime: new Date(),
  endTime: new Date(),
  currentPlayers: 4,
  maxPlayers: 5,
  sport: { id: "1", name: "Baloncesto", available_fields: 2, available_bookings: 5 },
  field: {
    id: "1",
    name: "Cancha de baloncesto",
    address: "Calle 123",
    city: { id: "1", name: "Medellín" },
    sports: [{ id: "1", name: "Baloncesto", available_fields: 2, available_bookings: 5 }],
    createdById: "1",
  },
  image: null,
};

const mockData: FieldDetailEntity = {
  id: "abc",
  field_name: "Campo de Futbol",
  field_rating: 3,
  phone_number: "123456789",
  address: "Calle 123",
  opening_time: "8:00 - 20:00",
  image_url: "/assets/basket_horizontal.jpg",
  isBooking: true,
  field_type: "booking"
};

interface BookingDetailPageProps { }

const BookingDetailPage: FC<BookingDetailPageProps> = () => {
  const bookingArray: any[] = [1, 1, 1, 1];
  const price: number = 100;

  const handlePayment = (bank: string) => {
    alert("Pagando por el método de pago: " + bank);
  }


  const [isSplit, setIsSplit] = useState(false);

  const priceToShow = isSplit ? (price / mockEvent.currentPlayers).toFixed(2) : price;


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
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/bookings" }}>
            Mis Reservas
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{mockData.field_name}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row lg={3} md={3} sm={2} xs={1} className="gy-3 justify-content-center">

        <FieldDetailCardComponent field={mockData} price={price} />

      </Row>
      <Row className="px-4">
        <Col lg={3} md={6} sm={12} xs={12}>
          <h2 className={styles.participantTitle}>Participantes ({mockEvent.currentPlayers}/{mockEvent.maxPlayers}):</h2>
          {bookingArray.map((item, index) => (

            <Col key={index} className={`d-flex ${styles.participantRow}`}>
              <div className={styles.iconContainer}>
                <ProfileIcon width="35" height="45" style={{ fill: "#E99E14" }} />
              </div>
              <h3 className={styles.participantName}>{mockPlayer.name}</h3>
            </Col>
          ))}
        </Col>


        <Col className={`${styles.priceColumn} d-flex flex-column align-items-center justify-content-center px-4`}>
          <Form.Group controlId="splitPriceCheckbox" className="text-center">
            <Form.Check
              type="checkbox"
              label="Dividir precio entre jugadores"
              checked={isSplit}
              onChange={() => setIsSplit(!isSplit)}
              className={styles.checkbox}
            />
          </Form.Group>

          {/* Display Calculated Price */}
          <h3 className={styles.priceText}>Precio: ${priceToShow}</h3>
          <h3 className={styles.selectText}>Selecciona cómo deseas pagar</h3>

          {/* Image Below Price */}
          <div className={styles.imageWrapper}>
            <img src="https://ccce.org.co/wp-content/uploads/2019/09/consejo-ccce-payu.jpg" alt="Pago PayU" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
            <img src="https://d31dn7nfpuwjnm.cloudfront.net/images/valoraciones/0039/6155/Qu%C3%A9_es_Nequi_y_c%C3%B3mo_funciona.jpg?1598852798" alt="Pago Nequi" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
            <img src="https://www.sifer.com.co/wp-content/uploads/2021/02/pse-forma.jpg" alt="Pago PSE" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
            <img src="https://play-lh.googleusercontent.com/fIwuxVTuoLOzhrKJL6GCGIKuEJc6JFu9Ii97cp0nFWE61qpfeaIhFBiNL5wFcydvhQA" alt="Pago DaviPlata" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
          </div>
          <div className={styles.imageWrapper}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlhi5rxI9Fcyi4s0Y-nZM3FFvDX1asdLYOgA&s" alt="Mercado Pago" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0cWaCbny3YjfPiMmFHZkwXpf-8nUrnqIU2w&s" alt="Mastercard" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
            <img src="https://bulevar.com.co/wp-content/uploads/2023/07/bancolombia.jpg" alt="Bancolombia" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
          </div>
        </Col>


      </Row>
    </Container>
  );
};

export default BookingDetailPage;