import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";

import sportHubLogo from "../icons/sporthublogotext.png";

import { ReactComponent as CalendarIcon } from "../icons/calendarIcon.svg";
import { ReactComponent as CourtIcon } from "../icons/courtIcon.svg";
import { ReactComponent as SportsIcon } from "../icons/sportsIcon.svg";
import { ReactComponent as JoinIcon } from "../icons/joinIcon.svg";
import { ReactComponent as ProfileIcon } from "../icons/profileIcon.svg";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <Navbar expand="ls" className="custom-navbar mb-0">
        <Container fluid>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> */}
          <Link to="/home">
            <Navbar.Brand>
              <img
                src={sportHubLogo}
                width="300"
                height="120"
                className="d-inline-block align-top"
                alt="SportHub logo"
              />
            </Navbar.Brand>
          </Link>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Busca Canchas, Deportes o Reservas"
              className="me-2 flex-grow-1"
              aria-label="Search"
              // style={{ height: '50px', fontSize: '1.1rem' , width: '700px'}}
            />
            <Button
              className="custom-outline-btn"
              size="lg"
              style={{ height: "50px", color: "#FFFFFF" }}
            >
              Buscar
            </Button>
          </Form>
          <Link to="/profile">
            <Nav.Item>
              <Col xs={6} md={3} className="text-center mb-2 mb-md-0">
                <ProfileIcon
                  width="50"
                  height="80"
                  className="d-inline-block align-top"
                  style={{ fill: "#E99E14" }}
                />
                <p
                  className="mb-0 mt-0 fw-bold text-gold"
                  style={{
                    color: "#E99E14",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "0",
                    marginTop: "4px",
                  }}
                >
                  Perfil
                </p>
              </Col>
            </Nav.Item>
          </Link>
          {/* </Navbar.Collapse>   */}
        </Container>
      </Navbar>

      {/* New Image Row */}
      <Container fluid className="custom-navbar mb-0">
        <Row className="justify-content-center align-items-center">
          <Col xs={6} md={3} className="text-center mb-2 mb-md-0">
            <Link to="/bookings">
              <CalendarIcon
                width="60"
                height="90"
                className="d-inline-block align-top"
                style={{ fill: "#E99E14" }}
              />
              <p
                className="mb-0 mt-0 fw-bold text-gold"
                style={{
                  color: "#E99E14",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "0",
                  marginTop: "4px",
                }}
              >
                Mis Reservas
              </p>
            </Link>
          </Col>
          <Col xs={6} md={3} className="text-center mb-2 mb-md-0">
            <Link to="/fields">
              <CourtIcon
                width="60"
                height="90"
                className="d-inline-block align-top"
                style={{ fill: "#E99E14" }}
              />
              <p
                className="mb-0 mt-0 fw-bold text-gold"
                style={{
                  color: "#E99E14",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "0",
                  marginTop: "4px",
                }}
              >
                Canchas
              </p>
            </Link>
          </Col>
          <Col xs={6} md={3} className="text-center mb-2 mb-md-0">
            <Link to="/sports">
              <SportsIcon
                width="60"
                height="90"
                className="d-inline-block align-top"
                style={{ fill: "#E99E14" }}
              />
              <p
                className="mb-0 mt-0 fw-bold text-gold"
                style={{
                  color: "#E99E14",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "0",
                  marginTop: "4px",
                }}
              >
                Deportes
              </p>
            </Link>
          </Col>
          <Col xs={6} md={3} className="text-center mb-2 mb-md-0">
            <Link to="/events">
              <JoinIcon
                width="60"
                height="90"
                className="d-inline-block align-top"
                style={{ fill: "#E99E14" }}
              />
              <p
                className="mb-0 mt-0 fw-bold text-gold"
                style={{
                  color: "#E99E14",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "0",
                  marginTop: "4px",
                }}
              >
                Eventos
              </p>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NavBar;
