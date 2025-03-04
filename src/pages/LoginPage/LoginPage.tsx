import styles from "./LoginPage.module.scss";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
      <Container className={styles.login_container}>
        <Col>
          <Row>
            <h1 className={`display-1 ${styles.sporthub_title}`}>SportHub</h1>
          </Row>
          <Row>
            <Card className={styles.login_card}>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Ingrese su correo"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingrese su contraseña"
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Button className={styles.login_button} variant="primary">
              Login
            </Button>
          </Row>
          <Row>
            <span className={styles.register_text}>
              ¿Nuevo en Sporthub? <Link to={"/signup"}>Registrese aquí</Link>
            </span>
          </Row>
        </Col>
      </Container>
  );
}

export default LoginPage;
