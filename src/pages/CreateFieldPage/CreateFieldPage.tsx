import React, { FC } from "react";
import styles from "./CreateFieldPage.module.scss";
import { Breadcrumb, Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateFieldForm from "./CreateFieldForm/CreateFieldForm";

interface CreateFieldPageProps {}

const CreateFieldPage: FC<CreateFieldPageProps> = () => {
  const mockCities = [
    { id: "1", name: "Bogotá" },
    { id: "2", name: "Medellín" },
    { id: "3", name: "Cali" },
    { id: "4", name: "Barranquilla" },
    { id: "5", name: "Bucaramanga" },
  ];

  const mockSports = [
    { id: "1", name: "Fútbol", available_fields: 2, available_bookings: 5 },
    { id: "2", name: "Baloncesto", available_fields: 2, available_bookings: 2 },
    { id: "3", name: "Tenis", available_fields: 3, available_bookings: 5 },
    { id: "4", name: "Voleibol", available_fields: 1, available_bookings: 3 },
    { id: "5", name: "Padel 🏳️‍🌈", available_fields: 6, available_bookings: 8},
    { id: "6", name: "Squash", available_fields: 6, available_bookings: 8},
    { id: "7", name: "Futbol-5", available_fields: 6, available_bookings: 8},
    { id: "8", name: "Patinaje", available_fields: 6, available_bookings: 8},
  ];
  return (
    <Container fluid className={`main_content_container`}>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/fields" }}>
            Canchas
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Crear Cancha</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row className="justify-content-center px-3">
        <Card className={styles.form_card}>
          <Card.Header>Crear una nueva Cancha</Card.Header>
          <Card.Body>
            <CreateFieldForm sports={mockSports} cities={mockCities} />
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default CreateFieldPage;
