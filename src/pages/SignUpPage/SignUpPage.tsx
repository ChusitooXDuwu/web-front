import { FunctionComponent } from "react";
import styles from "./SignUpPage.module.scss";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

interface SignUpPageProps {}

const SignUpPage: FunctionComponent<SignUpPageProps> = () => {
  return (
    <>
      <Container fluid className={"mx-1"}>
        <Row>
          <Col>
            <h1 className={styles.sporthub_title}>Sporthub</h1>
          </Col>
          <Col className="mt-5">
            <p className={styles.signin_text}>
              <span className={styles.signin_question}>
                ¿Eres miembro de sporthub?
              </span>
              <Link to={"/login"} className={styles.signin_link}>
                Inicia sesión
              </Link>
            </p>
          </Col>
        </Row>
        <Row>
          <Card className={styles.signup_card}>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Ingrese su nombre" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="email" placeholder="Ingrese su correo" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control type="tel" placeholder="Ingrese su teléfono" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Form>
              <br />
              <Row>
                <Button className={styles.submit_button}>Crear Cuenta</Button>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default SignUpPage;
