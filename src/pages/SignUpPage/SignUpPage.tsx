import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import styles from "./SignUpPage.module.scss";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthDate: Date;
}

interface SignUpPageProps {}

const SignUpPage: FunctionComponent<SignUpPageProps> = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthDate: new Date(),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", signUpData);
    navigate("/login");
  };

  return (
    <Container fluid className={"px-md-5 py-2"}>
      <Row>
        <Col>
          <h1 className={`display-1 ${styles.sporthub_title}`}>Sporthub</h1>
        </Col>
        <Col>
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
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  name="name"
                  onChange={handleChange}
                  type="text"
                  placeholder="Ingrese su nombre"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  required
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="Ingrese su correo"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  required
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Ingrese su contraseña"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  required
                  name="phone"
                  onChange={handleChange}
                  type="tel"
                  placeholder="Ingrese su teléfono"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  required
                  name="birthDate"
                  onChange={handleChange}
                  type="date"
                />
              </Form.Group>
              <br />
              <Row>
                <Button type="submit" className={styles.submit_button}>
                  Crear Cuenta
                </Button>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default SignUpPage;
