import React, { FC } from "react";
import styles from "./FieldsPage.module.scss";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FieldEntity } from "../../entities/Entities";
import FieldCardComponent from "./FieldCardComponent/FieldCardComponent";

interface FieldsPageProps {}

const FieldsPage: FC<FieldsPageProps> = () => {
  const FieldsData: Array<FieldEntity | null> = Array(10).fill(null);
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
              <FieldCardComponent />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FieldsPage;
