import FieldCardComponent from "../FieldsPage/FieldCardComponent/FieldCardComponent";
import FieldEntity from "../../entities/FieldEntity";
import CityEntity from "../../entities/CityEntity";
import SportEntity from "../../entities/SportEntity";
import { Link } from "react-router-dom";
import styles from "./FieldDetailPageMap.module.scss";
import GameCardComponent from "../../components/GameCardComponent/GameCardComponents";
import FieldDetailEntity from "../../entities/FieldDetailEntity";
import FieldMapCardComponent from "../../components/FieldMapCardComponent/FieldMapCardComponent";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";

const mockCity: CityEntity = {
    id: "1",
    name: "Mock City",
};

const mockSports: SportEntity[] = [
    {
        id: "1",
        name: "Soccer",
        available_fields: 2,
        available_bookings: 5
    },
    {
        id: "2",
        name: "Basketball",
        available_fields: 2,
        available_bookings: 2
    },
];

const mockFieldEntity: FieldEntity = {
    id: "1",
    name: "Mock Field",
    city: mockCity,
    address: "123 Mock Street",
    sports: mockSports,
    createdById: "user123",
};

const mockData: FieldDetailEntity = {
  id: "abc",
  field_name: "Campo de Futbol",
  field_rating: 3,
  phone_number: "123456789",
  address: "Calle 123",
  opening_time: "8:00 - 20:00",
  image_url: "/assets/basket_horizontal.jpg",
  isBooking: false,
  field_type: "field"
};


function FieldDetailPageMap() {



    return (
        <>
        <Row className={`${styles.title_row} pt-2 `} md={12}>
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            Inicio
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/fields" }}>
            Canchas
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/fields/${mockFieldEntity.id}` }}>
            Canchas
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{`Map of ${mockFieldEntity.name}`}</Breadcrumb.Item>
        </Breadcrumb>
        </Row>
        <Container fluid className="main_content_container pt-2 d-flex">
            <Row className= {`mb-3 gy-2 ${styles.main_row} `} >
                <Col md={4} className={`${styles.left_col}`}>
                    <FieldMapCardComponent field={mockData} />
                </Col>
                <Col md={8}>
                    <h1>Map goes here :)</h1>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default FieldDetailPageMap