import React, { FC } from 'react';
import styles from './EventDetailPage.module.scss';
import { Breadcrumb, Container, Row, Col} from "react-bootstrap";
import FieldDetailCardComponent from "../../components/FieldDetailCardComponent/FieldDetailCardComponent";
import { Link } from "react-router-dom";
import FieldDetailEntity from "../../entities/FieldDetailEntity";
import BookingCard from "../../components/BookingCard/BookingCard";
import GameCardComponent from '../../components/GameCardComponent/GameCardComponents';
import { EventEntity } from '../../entities/Entities';
import { ReactComponent as ProfileIcon } from "../../icons/profileIcon.svg";
import UserEntity from '../../entities/UserEntity';

import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';
import { useState } from 'react';
import { useContext } from 'react';

const mockPlayer: UserEntity = { 
  id: "1",
  name: "Juan",
  email: "j.name@uniandes.edu.co",
  gender: "Masculino",
  favorite_sports: "Baloncesto",
  phone_number: "123456789",
  image_url: "/assets/basket_horizontal.jpg"
  }

const mockData: FieldDetailEntity = {
  id: "abc",
  field_name: "Campo de Futbol",
  field_rating: 3,
  phone_number: "123456789",
  address: "Calle 123",
  opening_time: "8:00 - 20:00",
  image_url: "/assets/basket_horizontal.jpg",
  isBooking: false,
  field_type: "event"
};

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


interface EventDetailPageProps {}

const EventDetailPage: FC<EventDetailPageProps> = () => {
  const bookingArray: any[] = [1, 1, 1, 1, 1];
  return (
  <Container
    fluid
    className={`main_content_container ${styles.main_content}`}
  >
    <Row className={`pt-2 ${styles.title_row}`}>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
          <FormattedMessage id="pages.home" />
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/events" }}>
            <FormattedMessage id="pages.events" />
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{mockData.field_name}</Breadcrumb.Item>
      </Breadcrumb>
    </Row>
    <Row lg={3} md={3} sm={2} xs={1} className="gy-3 justify-content-center">
      
        <FieldDetailCardComponent field={mockData} price= {100}/>
        
    </Row>
    <Row className="justify-content-center">
        <div className={styles.alignedSection} >
          <h2 className={styles.participantTitle}> <FormattedMessage id="eventDetailPage.participants"/>({mockEvent.currentPlayers}/{mockEvent.maxPlayers}):</h2>
          <Col lg={3} md={2} sm={2} xs={1}>
          {bookingArray.map((item, index) => (
            
          <Col key={index} className={`d-flex ${styles.participantRow}`}>
            <div className={styles.iconContainer}>
              <ProfileIcon width="35" height="45" style={{ fill: "#E99E14" }}/>
            </div>
            <h3 className={styles.participantName}>{mockPlayer.name}</h3>
          </Col>
      ))}
          </Col>
        </div>
    </Row>
  </Container>
  );
};





export default EventDetailPage;
