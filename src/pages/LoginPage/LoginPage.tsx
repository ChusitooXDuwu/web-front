import styles from "./LoginPage.module.scss";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface LoginInfo {
  email: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const intl = useIntl();
  const [loginData, setLoginData] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Form submitted:`, loginData);
    navigate("/home");
  };

  const emailPlaceholder = intl.formatMessage({ id: "emailPlaceholder" });
  const passPlaceholder = intl.formatMessage({ id: "passwordPlaceholder" });

  return (
    <Container fluid className={styles.login_container}>
      <img
        src="/assets/basketball-court-full.png"
        alt="Background"
        className={styles.background_image}
      />
      <Col xs="auto" className={`${styles.login_col}`}>
        <h1 className={`display-1 ${styles.sporthub_title}`}>SportHub</h1>
        <Form onSubmit={handleSubmit} className={styles.login_form}>
          <Card className={styles.login_card}>
            <Card.Body>
              <Form.Group>
                <Form.Label>
                  <FormattedMessage id="email" />
                </Form.Label>
                <Form.Control
                  name="email"
                  required
                  onChange={handleChange}
                  type="email"
                  placeholder={emailPlaceholder}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <FormattedMessage id="password" />
                </Form.Label>
                <Form.Control
                  name="password"
                  required
                  onChange={handleChange}
                  type="password"
                  placeholder={passPlaceholder}
                />
              </Form.Group>
            </Card.Body>
          </Card>
          <Button
            type="submit"
            className={styles.login_button}
            variant="primary"
          >
            <FormattedMessage id="login"/>
          </Button>
        </Form>
        <p className={styles.register_text}>
          <FormattedMessage id="newInSporthub"/> {" "}
          <Link className={styles.register_link} to={"/signup"}>
            <FormattedMessage id="registerHere" />
          </Link>
        </p>
      </Col>
    </Container>
  );
}

export default LoginPage;
