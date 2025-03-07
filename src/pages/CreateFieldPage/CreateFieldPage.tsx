import React, { FC } from "react";
import styles from "./CreateFieldPage.module.scss";
import { Breadcrumb, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateFieldForm from "./CreateFieldForm/CreateFieldForm";

interface CreateFieldPageProps {}

const CreateFieldPage: FC<CreateFieldPageProps> = () => {
  const mockCities = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Bucaramanga",
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
          <Card.Body><CreateFieldForm cities={mockCities}/></Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default CreateFieldPage;
