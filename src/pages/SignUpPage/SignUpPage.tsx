import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import styles from "./SignUpPage.module.scss";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import { FormattedMessage, useIntl } from "react-intl";

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
  const intl = useIntl();
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
  const namePh = intl.formatMessage({ id: "form.placeholder.name" });
  const emailPh = intl.formatMessage({ id: "form.placeholder.email" });
  const passwordPh = intl.formatMessage({ id: "form.placeholder.password" });
  const phonePh = intl.formatMessage({ id: "form.placeholder.phone" });

  return (
    <Container fluid className={"px-md-5 py-2"}>
      <img
              src="/assets/basketball-court-full.png"
              alt="Background"
              className={styles.background_image}
            />
      <Row className={styles.signup_row}>
        <Col>
          <h1 className={`display-1 ${styles.sporthub_title}`}>Sporthub</h1>
        </Col>
        <Col>
          <p className={styles.signin_text}>
            <span className={styles.signin_question}>
              <FormattedMessage id="areYouAMember" />
            </span>
            <Link to={"/login"} className={styles.signin_link}>
              <FormattedMessage id="login" />
            </Link>
          </p>
        </Col>
      </Row>
      <Row className={styles.signup_row}>
        <Card className={styles.signup_card}>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>
                  <FormattedMessage id="form.label.name" />
                </Form.Label>
                <Form.Control
                  required
                  name="name"
                  onChange={handleChange}
                  type="text"
                  placeholder={namePh}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <FormattedMessage id="form.label.email" />
                </Form.Label>
                <Form.Control
                  required
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder={emailPh}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <FormattedMessage id="form.label.password" />
                </Form.Label>
                <Form.Control
                  required
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder={passwordPh}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                <FormattedMessage id="form.label.phone"/>
                </Form.Label>
                <Form.Control
                  required
                  name="phone"
                  onChange={handleChange}
                  type="tel"
                  placeholder={phonePh}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                <FormattedMessage id="form.label.birthdate"/>
                </Form.Label>
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
                  <FormattedMessage id="signup" />
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
