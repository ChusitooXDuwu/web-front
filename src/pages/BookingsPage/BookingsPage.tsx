import React, { FC } from "react";
import styles from "./BookingsPage.module.scss";
import { Container, Row } from "react-bootstrap";
import BookingCard from "../../components/BookingCard/BookingCard";
import BookedEventEntity from "../../entities/BookedEventEntity";

// TODO REPLACE WITH API FETCH
const mockData: BookedEventEntity = {
  id: "abc",
  startDateTime: new Date(),
  endDateTime: new Date(),
  locationName: "Futbol 8 la 80",
  address: "AC 80 con autopista norte",
  sportName: "Fúbo",
};


interface BookingsPageProps {}

const BookingsPage: FC<BookingsPageProps> = () => {
  const bookingArray: any[] = [1, 1, 1, 1, 1];
  return (
    <Container
      fluid
      className={`main_content_container ${styles.main_content}`}
    >
      <Row className={""}>
        <h1 className={`display-5 ${styles.page_header}`}>Mis Reservas</h1>
      </Row>
      {bookingArray.map((item, index) => (
        <Row key={index} className={`mb-2 ${styles.card_row}`}>
          <BookingCard bookedEvent={mockData} />
        </Row>
      ))}
    </Container>
  );
};

export default BookingsPage;
