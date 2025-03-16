import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BookingCard from "../../components/BookingCard/BookingCard";
import GameCardComponent from "../../components/GameCardComponent/GameCardComponents";
import { EventEntity } from "../../entities/Entities";
import { getMyBookings } from "../../services/BookingsService/BookingsService";
import styles from "./HomePage.module.scss";

interface noDataCardProps {
  dataName: string;
  actionPrompt: string;
  link: string;
}

const NoDataCard: FC<noDataCardProps> = ({ dataName, actionPrompt, link }) => {
  const navigate = useNavigate();
  const navToLink = () => navigate(link);
  return (
    <Card>
      <Card.Body className="text-center">
        No se encontraron {dataName}. Intenta{" "}
        <Button variant="outline-primary" size="sm" onClick={navToLink}>
          {actionPrompt}
        </Button>{" "}
      </Card.Body>
    </Card>
  );
};

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
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
  const { isSuccess, data } = useQuery({
    queryKey: ["bookings"],
    queryFn: getMyBookings,
  });
  const upcomingEvents = isSuccess ? data.data : [];
  let suggestedEvents = Array(10).fill(mockEvent);
  const renderSuggestedEvents = suggestedEvents.map((event, index) => (
    <Col key={index} className="d-flex justify-content-center">
      <GameCardComponent event={event} />
    </Col>
  ));
  const renderUpcomingEvents = upcomingEvents.map((event, index) => (
    <Col key={index} className="d-flex justify-content-center">
      <BookingCard bookedEvent={event!} />
    </Col>
  ));
  return (
    <Container fluid className={"main_content_container"}>
      <Container fluid={"md"}>
        <section>
          <h1 className={styles.section_header}>Mis próximos partidos</h1>
          <Row xs={1} className="gy-2">
            {upcomingEvents.length > 0 ? (
              renderUpcomingEvents
            ) : (
              <NoDataCard
                dataName="partidos próximos"
                actionPrompt="agregar un partido"
                link="/events"
              />
            )}
          </Row>
        </section>
        <section>
          <h1 className={styles.section_header}>Partidos disponibles</h1>
          {suggestedEvents.length > 0 ? (
            <Row lg={3} md={2} sm={2} xs={1} className="gy-2">
              {renderSuggestedEvents}
            </Row>
          ) : (
            <Row>
              <NoDataCard
                dataName="partidos disponibles"
                actionPrompt="buscar un partido"
                link="/events"
              />
            </Row>
          )}
        </section>
      </Container>
    </Container>
  );
};

export default HomePage;
