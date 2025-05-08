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

// Define the Gender enum to match backend
enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

interface SignUpData {
  givenName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: Date;
  gender: Gender | null;
  isOwner: boolean;
  description: string;
  favoriteSportsIds: string[];
  favoriteFieldsIds: string[];
  friendsIds: string[];
}

interface SignUpPageProps {}

const SignUpPage: FunctionComponent<SignUpPageProps> = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const [signUpData, setSignUpData] = useState<SignUpData>({
    givenName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    birthDate: new Date(),
    gender: null,
    isOwner: false,
    description: "",
    favoriteSportsIds: [],
    favoriteFieldsIds: [],
    friendsIds: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setSignUpData({
        ...signUpData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setSignUpData({ ...signUpData, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", signUpData);
    navigate("/login");
  };

  const givenNamePh = intl.formatMessage({ id: "form.placeholder.givenName" });
  const lastNamePh = intl.formatMessage({ id: "form.placeholder.lastName" });
  const emailPh = intl.formatMessage({ id: "form.placeholder.email" });
  const passwordPh = intl.formatMessage({ id: "form.placeholder.password" });
  const phonePh = intl.formatMessage({ id: "form.placeholder.phone" });
  const descriptionPh = intl.formatMessage({
    id: "form.placeholder.description",
  });

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
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FormattedMessage id="form.label.givenName" />
                    </Form.Label>
                    <Form.Control
                      required
                      name="givenName"
                      onChange={handleChange}
                      type="text"
                      placeholder={givenNamePh}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FormattedMessage id="form.label.lastName" />
                    </Form.Label>
                    <Form.Control
                      required
                      name="lastName"
                      onChange={handleChange}
                      type="text"
                      placeholder={lastNamePh}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
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

              <Form.Group className="mb-3">
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

              <Form.Group className="mb-3">
                <Form.Label>
                  <FormattedMessage id="form.label.phone" />
                </Form.Label>
                <Form.Control
                  required
                  name="phoneNumber"
                  onChange={handleChange}
                  type="tel"
                  placeholder={phonePh}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FormattedMessage id="form.label.birthdate" />
                </Form.Label>
                <Form.Control
                  required
                  name="birthDate"
                  onChange={handleChange}
                  type="date"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FormattedMessage id="form.label.gender" />
                </Form.Label>
                <Form.Select
                  required
                  name="gender"
                  onChange={handleChange}
                  value={signUpData.gender || ""}
                >
                  <option value={Gender.MALE}>
                    <FormattedMessage id="form.gender.male" />
                  </option>
                  <option value={Gender.FEMALE}>
                    <FormattedMessage id="form.gender.female" />
                  </option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="isOwner"
                  onChange={handleChange}
                  label={intl.formatMessage({ id: "form.label.isOwner" })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FormattedMessage id="form.label.description" />
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  onChange={handleChange}
                  placeholder={descriptionPh}
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
