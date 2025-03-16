import FieldCardComponent from "../FieldsPage/FieldCardComponent/FieldCardComponent";
import FieldEntity from "../../entities/FieldEntity";
import CityEntity from "../../entities/CityEntity";
import SportEntity from "../../entities/SportEntity";
import GameCardComponent from "../../components/GameCardComponent/GameCardComponents";
import FieldDetailEntity from "../../entities/FieldDetailEntity";
import FieldDetailCardComponent from "../../components/FieldDetailCardComponent/FieldDetailCardComponent";
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



function FieldDetailPageMap () {
    


    return (
        <div className="main_content_container pt-2">
            <Container fluid={"md"}>
                <Row className="mb-3 gy-2">
                    <Col>
                        <FieldCardComponent fieldData={mockFieldEntity} />
                    </Col>
                    <Col>
                        <FieldCardComponent fieldData={mockFieldEntity} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default FieldDetailPageMap