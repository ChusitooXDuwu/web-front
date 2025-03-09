import React, { FC } from "react";
import styles from "./FieldsPage.module.scss";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CityEntity, FieldEntity, SportEntity } from "../../entities/Entities";
import FieldCardComponent from "./FieldCardComponent/FieldCardComponent";

interface FieldsPageProps {}

const FieldsPage: FC<FieldsPageProps> = () => {
  const mockCity: CityEntity = {
    id: "1",
    name: "Mock City",
    // other fields if any...
  };
  
  const mockSports: SportEntity[] = [
    {
      id: "1",
      name: "Soccer",
      // other fields if any...
    },
    {
      id: "2",
      name: "Basketball",
      // other fields if any...
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
  const FieldsData: Array<FieldEntity> = Array(10).fill(mockFieldEntity);
  return (
    <div className="main_content_container">
      <Container fluid={"md"}>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Canchas</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col>
            <h1>Canchas disponibles</h1>
          </Col>
          <Col className="d-flex">
            <Form className="d-flex align-items-center ms-auto">
              <Form.Control
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Col>
        </Row>
        <Row lg={3} md={3} sm={2} xs={1} className="gy-3">
          {FieldsData.map((item, index) => (
            <Col key={item ? item.id : index}>
              <FieldCardComponent fieldData={item}/>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FieldsPage;
