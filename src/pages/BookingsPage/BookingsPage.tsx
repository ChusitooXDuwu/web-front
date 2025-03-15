import { FC } from "react";
import styles from "./BookingsPage.module.scss";
import { Breadcrumb, Container, Row } from "react-bootstrap";
import BookingCard from "../../components/BookingCard/BookingCard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../../services/BookingsService/BookingsService";

interface BookingsPageProps {}

const BookingsPage: FC<BookingsPageProps> = () => {
  const { isSuccess, data } = useQuery({
    queryKey: ["bookings"],
    queryFn: getMyBookings,
  });
  return (
    <Container
      fluid
      className={`main_content_container ${styles.main_content}`}
    >
      <Row className={`pt-2 mb-2 ${styles.title_row}`}>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item active linkAs={Link} linkProps={{ to: "/bookings" }}>
            Reservas
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1 className={`display-5 ${styles.page_header}`}>Mis Reservas</h1>
      </Row>
      {isSuccess &&
        data.data.map((item, index) => (
          <Row
            key={index}
            className={`d-flex flex-col justify-content-center mb-2 ${styles.card_row}`}
          >
            <BookingCard bookedEvent={item!} />
          </Row>
        ))}
    </Container>
  );
};

export default BookingsPage;
