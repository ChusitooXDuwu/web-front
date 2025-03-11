import React, { FC } from 'react';
import styles from './SportsPage.module.scss';
import { Breadcrumb, Container, Row, Col} from "react-bootstrap";
import SportCard from "../../components/SportCard/SportCard";
import SportEntity from "../../entities/SportEntity";
import { Link } from "react-router-dom";

// TODO REPLACE WITH API FETCH
const mockData: SportEntity = {
  id: "abc",
  name: "Fútbol"
};

interface SportsPageProps {}

const SportsPage: FC<SportsPageProps> = () => {
  const SportArray: any[] = [1, 1];
  return (
    <Container
      fluid
      className={`main_content_container ${styles.main_content}`}
    >
      <Row className={`pt-2 ${styles.title_row}`}>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item active linkAs={Link} linkProps={{ to: "/Sports" }}>
            Deportes
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1 className={`display-5 ${styles.page_header}`}>Deportes</h1>
      </Row>
      {SportArray.map((item, index) => (
        
        <Row key={index}>
          <Col>
          <SportCard sport={mockData} />
          </Col>
          <Col>
          <SportCard sport={mockData} />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default SportsPage;
