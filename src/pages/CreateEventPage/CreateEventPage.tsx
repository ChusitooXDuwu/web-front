import FieldCardComponent from "../FieldsPage/FieldCardComponent/FieldCardComponent";
import FieldEntity from "../../entities/FieldEntity";
import CityEntity from "../../entities/CityEntity";
import SportEntity from "../../entities/SportInterface";
import { Link } from "react-router-dom";
import FieldDetailEntity from "../../entities/FieldDetailEntity";
import FieldMapCardComponent from "../../components/FieldMapCardComponent/FieldMapCardComponent";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import CustomMap from "../../components/MapComponent/MapComponent";
import styles from './CreateEventPage.module.scss';
import CreateEventForm from "../../components/EventForm/EventForm";
import { useQuery } from "@tanstack/react-query";
import getCities from "../../services/CitiesService/CitiesService";
import getSports from "../../services/SportsService/SportsService";



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

function CreateEventPage() {

  const { data: citiesData } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  const { data: sportsData } = useQuery({
    queryKey: ["sports"],
    queryFn: getSports,
  });
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
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/fields/${mockData.id}` }}>
            {mockData.field_name}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{`Mapa de  ${mockData.field_name}`}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Container fluid className="main_content_container pt-2 d-flex">
        <Row className={`mb-3 gy-2 ${styles.main_row} `} >
          <Col md={4} className={`${styles.left_col}`}>
            <FieldMapCardComponent field={mockData} />
          </Col>
          <Col md={8} className={styles.right_col}>
            <CreateEventForm sports={sportsData ? sportsData.data : []}
              cities={citiesData ? citiesData.data : []}></CreateEventForm>
          </Col>
        </Row>
      </Container>
    </>
  )
}



export default CreateEventPage;
