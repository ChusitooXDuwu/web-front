import React, { FC } from 'react';
import styles from './FieldDetailPage.module.scss';
import { Breadcrumb, Container, Row, Col} from "react-bootstrap";
import FieldDetailCardComponent from "../../components/FieldDetailCardComponent/FieldDetailCardComponent";
import { Link } from "react-router-dom";
import FieldDetailEntity from "../../entities/FieldDetailEntity";


// TODO REPLACE WITH API FETCH


const mockData: FieldDetailEntity = {
  id: "abc",
  field_name: "Campo de Futbol",
  field_rating: 4.5,
  phone_number: "123456789",
  address: "Calle 123",
  opening_time: "8:00 - 20:00",
  image_url: "/assets/stock-bb-court.jpeg"
};




interface FieldDetailPageProps {}

const FieldDetailPage: FC<FieldDetailPageProps> = () => (
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
    </Row>
    <Row lg={3} md={3} sm={2} xs={1} className="gy-3 justify-content-center">
      <Col className="d-flex justify-content-center">
        <FieldDetailCardComponent field={mockData} />
      </Col>
    </Row>
    
    


    
  </Container>
);

export default FieldDetailPage;
