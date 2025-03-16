import React, { useState } from 'react';
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  Row,
  Col,
  Offcanvas
} from "react-bootstrap";

import sportHubLogo from "../icons/sporthublogotext.png";

import { ReactComponent as CalendarIcon } from "../icons/calendarIcon.svg";
import { ReactComponent as CourtIcon } from "../icons/courtIcon.svg";
import { ReactComponent as SportsIcon } from "../icons/sportsIcon.svg";
import { ReactComponent as JoinIcon } from "../icons/joinIcon.svg";
import { ReactComponent as ProfileIcon } from "../icons/profileIcon.svg";
import { Link } from "react-router-dom";
import { useContext } from 'react';

import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';

function NavBar() {
  // State to control the offcanvas visibility
  const { locale } = useContext(LocaleContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const intl = useIntl();
  const { formatMessage } = intl;

  // Functions to open and close the offcanvas
  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <>
      {/* Top Navbar - Always visible, contains hamburger on mobile */}
      <Navbar expand="ls" className="custom-navbar navbar-dark py-2 py-md-0 mb-0">
        <Container fluid className="position-relative px-3">
          <Row className="w-100 align-items-center">
            {/* First row in mobile - Logo and Profile */}
            <Col xs={6} className="d-md-none ps-0">
              {/* 1. Logo - First on mobile and desktop */}
              <Link to="/home" className="d-flex justify-content-start">
                <Navbar.Brand className="ps-0 ms-0">
                  <img
                    src={sportHubLogo}
                    width="160"
                    height="60"
                    className="d-inline-block align-top"
                    alt="SportHub logo"
                  />
                </Navbar.Brand>
              </Link>
            </Col>
            
            <Col xs={6} className="d-md-none pe-0">
              {/* 2. Profile Icon - Second on mobile */}
              <div className="d-flex justify-content-end">
                <Link to="/profile">
                  <Nav.Item>
                    <div className="text-center mb-0">
                      <ProfileIcon
                        width="35"
                        height="45"
                        className="d-inline-block align-top"
                        style={{ fill: "#E99E14" }}
                      />
                      <p
                        className="mb-0 mt-0 fw-bold text-gold"
                        style={{
                          color: "#E99E14",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        <FormattedMessage id="navbar.profile" />
                        
                      </p>
                    </div>
                  </Nav.Item>
                </Link>
              </div>
            </Col>
            
            {/* Desktop Logo */}
            <Col md="auto" className="d-none d-md-block">
              <Link to="/home">
                <Navbar.Brand>
                  <img
                    src={sportHubLogo}
                    width="180"
                    height="70"
                    className="d-inline-block align-top"
                    alt="SportHub logo"
                  />
                </Navbar.Brand>
              </Link>
            </Col>
            
            {/* Second row in mobile - Search and Hamburger */}
            <Col xs={9} className="d-md-none mt-3 ps-0">
              {/* 3. Compact Search Bar for Mobile */}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder={formatMessage({id: "navbar.searchPlaceholder"})}
                  className="me-1"
                  aria-label="Search"
                  style={{ height: '40px' }}
                />
                <Button
                  className="custom-outline-btn"
                  style={{ height: "40px", color: "#FFFFFF", padding: '0 10px' }}
                >
                  <span className="d-none d-sm-inline">
                    
                    <FormattedMessage id="navbar.searchButton" />
                  </span>
                  <span className="d-inline d-sm-none">🔍</span>
                </Button>
              </Form>
            </Col>
            
            <Col xs={3} className="d-md-none mt-3 pe-0">
              {/* 4. Hamburger button - now uses the state */}
              <div className="d-flex justify-content-end">
                <Navbar.Toggle 
                  aria-controls="mobile-navbar-offcanvas"
                  onClick={handleShow}
                />
              </div>
            </Col>
            
            {/* Desktop Search Bar */}
            <Col md className="d-none d-md-block">
              <Form className="d-flex flex-grow-1 mx-4">
                <Form.Control
                  type="search"
                  placeholder={formatMessage({id: "navbar.searchPlaceholder"})}
                  className="me-2 flex-grow-1"
                  aria-label="Search"
                  style={{ height: '40px' }}
                />
                <Button
                  className="custom-outline-btn"
                  style={{ height: "40px", color: "#FFFFFF" }}
                >
                    <FormattedMessage id="navbar.searchButton" />
                </Button>
              </Form>
            </Col>
            
            {/* Desktop Profile Icon */}
            <Col md="auto" className="d-none d-md-block">
              <Link to="/profile">
                <Nav.Item>
                  <div className="text-center mb-0">
                    <ProfileIcon
                      width="35"
                      height="50"
                      className="d-inline-block align-top"
                      style={{ fill: "#E99E14" }}
                    />
                    <p
                      className="mb-0 mt-0 fw-bold text-gold"
                      style={{
                        color: "#E99E14",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      <FormattedMessage id="navbar.profile" />
                    </p>
                  </div>
                </Nav.Item>
              </Link>
            </Col>
          </Row>
          
          {/* Mobile menu offcanvas - now controlled by state */}
          <Offcanvas 
            show={showOffcanvas} 
            onHide={handleClose} 
            placement="end" 
            className="d-md-none"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link to="/bookings" className="nav-link my-3" onClick={handleClose}>
                  <div className="d-flex align-items-center">
                    <CalendarIcon
                      width="40"
                      height="50"
                      style={{ fill: "#E99E14" }}
                    />
                    <span className="ms-3 fw-bold" style={{ color: "#E99E14" }}>
                      <FormattedMessage id="navbar.bookings" />
                    </span>
                  </div>
                </Link>
                <Link to="/fields" className="nav-link my-3" onClick={handleClose}>
                  <div className="d-flex align-items-center">
                    <CourtIcon
                      width="40"
                      height="50"
                      style={{ fill: "#E99E14" }}
                    />
                    <span className="ms-3 fw-bold" style={{ color: "#E99E14" }}>
                        <FormattedMessage id="navbar.fields" />
                    </span>
                  </div>
                </Link>
                <Link to="/sports" className="nav-link my-3" onClick={handleClose}>
                  <div className="d-flex align-items-center">
                    <SportsIcon
                      width="40"
                      height="50"
                      style={{ fill: "#E99E14" }}
                    />
                    <span className="ms-3 fw-bold" style={{ color: "#E99E14" }}>
                        <FormattedMessage id="navbar.sports" />
                    </span>
                  </div>
                </Link>
                <Link to="/events" className="nav-link my-3" onClick={handleClose}>
                  <div className="d-flex align-items-center">
                    <JoinIcon
                      width="40"
                      height="50"
                      style={{ fill: "#E99E14" }}
                    />
                    <span className="ms-3 fw-bold" style={{ color: "#E99E14" }}>
                        <FormattedMessage id="navbar.events" />
                    </span>
                  </div>
                </Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>

      {/* Lower Navbar for Desktop View Only - hidden on mobile */}
      <Container fluid className="custom-navbar py-2 mb-0 d-none d-md-block">
        <Row className="justify-content-center align-items-center">
          <Col md={3} className="text-center mb-0">
            <Link to="/bookings">
              <CalendarIcon
                width="50"
                height="60"
                className="d-inline-block align-top"
                style={{ fill: "#E99E14" }}
              />
              <p
                className="mb-0 mt-0 fw-bold text-gold"
                style={{
                  color: "#E99E14",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <FormattedMessage id="navbar.bookings" />
              </p>
            </Link>
          </Col>
          <Col md={3} className="text-center mb-0">
            <Link to="/fields">
              <CourtIcon
                width="50"
                height="60"
                className="d-inline-block align-top"
                style={{ fill: "#E99E14" }}
              />
              <p
                className="mb-0 mt-0 fw-bold text-gold"
                style={{
                  color: "#E99E14",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <FormattedMessage id="navbar.fields" />
              </p>
            </Link>
          </Col>
          <Col md={3} className="text-center mb-0">
            <Link to="/sports">
              <SportsIcon
                width="50"
                height="60"
                className="d-inline-block align-top"
                style={{ fill: "#E99E14" }}
              />
              <p
                className="mb-0 mt-0 fw-bold text-gold"
                style={{
                  color: "#E99E14",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <FormattedMessage id="navbar.sports" />
              </p>
            </Link>
          </Col>
          <Col md={3} className="text-center mb-0">
            <Link to="/events">
              <JoinIcon
                width="50"
                height="60"
                className="d-inline-block align-top"
                style={{ fill: "#E99E14" }}
              />
              <p
                className="mb-0 mt-0 fw-bold text-gold"
                style={{
                  color: "#E99E14",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <FormattedMessage id="navbar.events" />
              </p>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NavBar;