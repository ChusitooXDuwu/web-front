import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./HomePage.module.scss";
import GameCardComponent from "../../components/GameCardComponent/GameCardComponents";
const mockCard = (
  <Card>
    <Card.Body>Monda</Card.Body>
  </Card>
);

function HomePage() {
  return (
    <>
      <Container fluid className={"main_content_container"}>
        <section>
          <h1 className={styles.section_header}>Mis próximos partidos</h1>
          <Row lg={5} md={4} sm={2} xs={1} className="gy-2">
            {Array.from({ length: 10 }).map((_, index) => (
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
            {Array.from({ length: 10 }).map((_, index) => (
              <Col key={index} className="d-flex justify-content-center">
                <GameCardComponent
                  start_time={new Date()}
                  end_time={new Date()}
                  current_players={4}
                  max_players={5}
                  sport="Baloncesto"
                  image={null}
                />
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </>
  );
}

export default HomePage;
