import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./HomePage.module.scss";
import GameCardComponent from "../../components/GameCardComponent/GameCardComponents";
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
              </Col>
            ))}
          </Row>
        </section>
        <section>
          <h1 className={styles.section_header}>Partidos disponibles</h1>
          <Row lg={5} md={4} sm={2} xs={1} className="gy-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <Col key={index}>
                <Card>
                  <Card.Body>
                    Monda
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </>
  );
}

export default HomePage;
