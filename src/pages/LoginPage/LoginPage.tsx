import styles from "./LoginPage.module.scss";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <Container fluid className={styles.login_container}>
      <Col
        xs="auto"
        className={`${styles.login_col}`}
      >
        <h1 className={`display-1 ${styles.sporthub_title}`}>SportHub</h1>
        <Card className={styles.login_card}>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Ingrese su correo" />
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
        <Button
          className={styles.login_button}
          variant="primary"
          onClick={() => navigate("/home")}
        >
          Login
        </Button>
        <p className={styles.register_text}>
          ¿Nuevo en Sporthub?{" "}
          <Link className={styles.register_link} to={"/signup"}>
            Registrese aquí
          </Link>
        </p>
      </Col>
    </Container>
  );
}

export default LoginPage;
