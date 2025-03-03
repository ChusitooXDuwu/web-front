
import { Navbar, Container, Nav, NavDropdown, Form, Button, Row, Col } from 'react-bootstrap';

import sportHubLogo from '../icons/sporthub_logo.png';
import calendarIcon from '../icons/calendarIcon.png';
import { ReactComponent as CalendarIcon } from '../icons/calendarIcon.svg';
import { ReactComponent as CourtIcon } from '../icons/courtIcon.svg';
import { ReactComponent as SportsIcon } from '../icons/sportsIcon.svg';
import { ReactComponent as JoinIcon } from '../icons/joinIcon.svg';
import { ReactComponent as ProfileIcon } from '../icons/profileIcon.svg';

function NavBar() {
    return (
      <>
        <Navbar expand="lg" className="custom-navbar">
          <Container fluid>
            <Navbar.Brand href="#home">
              <img
                src={sportHubLogo}
                width="60"
                height="40"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Nav.Link href="#action1"><h2>SportHub</h2></Nav.Link>
            {/* <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" disabled>
                  Link
                </Nav.Link>
              </Nav> */}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Nav.Item >
                <ProfileIcon width="60" height="90" className="d-inline-block align-top" style = {{ fill: "#E99E14"}}/>
                </Nav.Item>
            {/* </Navbar.Collapse> */}
          </Container>
        </Navbar>
        
        {/* New Image Row */}
        <Container fluid className="custom-navbar">
          <Row className="justify-content-center align-items-center">
            <Col xs={6} md={3} className="text-center mb-2 mb-md-0">
              <a href="#sports" className="text-decoration-none">
              <CalendarIcon width="60" height="90" className="d-inline-block align-top" style = {{ fill: "#E99E14"}}/>
                <p className="mb-0 mt-1">Mis Reservas</p>
              </a>
            </Col>
            <Col xs={6} md={3} className="text-center mb-2 mb-md-0">
              <a href="#news" className="text-decoration-none">
                <CourtIcon width="60" height="90" className="d-inline-block align-top" style = {{ fill: "#E99E14"}}/>
                <p className="mb-0 mt-1">Canchas</p>
              </a>
            </Col>
            <Col xs={6} md={3} className="text-center mb-2 mb-md-0">
              <a href="#events" className="text-decoration-none">
                <SportsIcon width="60" height="90" className="d-inline-block align-top" style = {{ fill: "#E99E14"}}/>
                <p className="mb-0 mt-1">Deportes</p>
              </a>
            </Col>
            <Col xs={6} md={3} className="text-center mb-2 mb-md-0">
              <a href="#shop" className="text-decoration-none">
              <JoinIcon width="60" height="90" className="d-inline-block align-top" style = {{ fill: "#E99E14"}}/>
                <p className="mb-0 mt-1">Unirse a una Reserva</p>
              </a>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
  
  export default NavBar;