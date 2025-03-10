import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./HomePage.module.scss";
import GameCardComponent from "../../components/GameCardComponent/GameCardComponents";
import { EventEntity } from "../../entities/Entities";
const mockCard = (
  <Card>
    <Card.Body>Monda</Card.Body>
  </Card>
);

function HomePage() {
  const mockEvent: EventEntity = {
    id: "1",
    startTime: new Date(),
    endTime: new Date(),
    currentPlayers: 4,
    maxPlayers: 5,
    sport: { id: "1", name: "Baloncesto" },
    field: {
      id: "1",
      name: "Cancha de baloncesto",
      address: "Calle 123",
      city: { id: "1", name: "Medellín" },
      sports: [{ id: "1", name: "Baloncesto" }],
      createdById: "1",
    },
    image: null,
  };
  const mockUpcomingEvent = null;
  const upcomingEvents = Array(10).fill(mockUpcomingEvent);
  const suggestedEvents = Array(10).fill(mockEvent);
  return (
    <Container fluid className={"main_content_container"}>
      <Container fluid={"md"}>
        <section>
          <h1 className={styles.section_header}>Mis próximos partidos</h1>
          <Row lg={5} md={4} sm={2} xs={1} className="gy-2">
            {upcomingEvents.map((_, index) => (
              <Col key={index}>
                {/* TODO add props for testing component */}
                {/* <GameCardComponent />  */}
                {mockCard}
              </Col>
            ))}
          </Row>
        </section>
        <section>
          <h1 className={styles.section_header}>Partidos disponibles</h1>
          <Row lg={3} md={2} sm={2} xs={1} className="gy-2">
            {suggestedEvents.map((event, index) => (
              <Col key={index} className="d-flex justify-content-center">
                <GameCardComponent event={event} />
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </Container>
  );
}

export default HomePage;
