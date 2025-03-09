import React, { FC } from "react";
import styles from "./FieldsPage.module.scss";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CityEntity, FieldEntity, SportEntity } from "../../entities/Entities";
import FieldCardComponent from "./FieldCardComponent/FieldCardComponent";

interface FieldsPageProps {}

const FieldsPage: FC<FieldsPageProps> = () => {
  const mockCity: CityEntity = {
    id: "1",
    name: "Mock City",
  };

  const mockSports: SportEntity[] = [
    {
      id: "1",
      name: "Soccer",
    },
    {
      id: "2",
      name: "Basketball",
    },
  ];

  const mockFieldEntity: FieldEntity = {
    id: "1",
    name: "Mock Field",
    city: mockCity,
    address: "123 Mock Street",
    sports: mockSports,
    createdById: "user123",
    // other fields from BaseEntity if any...
  };
  // Hooks
  const navigate = useNavigate();
  const FieldsData: Array<FieldEntity> = Array(10).fill(mockFieldEntity);
  return (
    <div className="main_content_container pt-2">
      <Container fluid={"md"}>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Canchas</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="mb-3 gy-2">
          <Col>
            <h1 className={`display-5 sh_gold`}>Canchas disponibles</h1>
          </Col>
          <Col md="auto" className={styles.create_col}>
            <Button onClick={() => navigate("/fields/create")}>
              Crear Cancha
            </Button>
          </Col>
          <Col md="auto" className={styles.search_col}>
            <Form className={styles.search_form}>
              <Form.Control
                type="search"
                placeholder="Buscar"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Col>
        </Row>
        <Row lg={3} md={3} sm={2} xs={1} className="gy-3">
          {FieldsData.map((item, index) => (
            <Col key={index}>
              <FieldCardComponent fieldData={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FieldsPage;
