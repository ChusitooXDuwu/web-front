import { ChangeEvent, FC, FormEvent, useState } from "react";
// import styles from "./EventsPage.module.scss";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CityEntity, EventInterface, FieldEntity, SportEntity } from "../../entities/Entities";
import { useQuery } from "@tanstack/react-query";
import GameCardComponent from "../../components/GameCardComponent/GameCardComponents";
import { getAvailableEvents } from "../../services/EventsService/EventsService";
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';

import { useContext } from 'react';

interface EventsPageProps {}

const EventsPage: FC<EventsPageProps> = () => {
  const mockCity: CityEntity = {
    id: "1",
    name: "Mock City",
  };

  const mockSports: SportEntity[] = [
    {
      id: "1",
      name: "Soccer",
      availableFields: 2,
      availableBookings: 5
    },
    {
      id: "2",
      name: "Basketball",
      availableFields: 2,
      availableBookings: 2
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

  const mockEvent: EventInterface = {
      id: "1",
      startTime: new Date(),
      endTime: new Date(),
      currentPlayers: 4,
      maxPlayers: 5,
      sport: { id: "1", name: "Baloncesto", availableFields: 2, availableBookings: 5 },
      field: {
        id: "1",
        name: "Cancha de baloncesto",
        address: "Calle 123",
        city: { id: "1", name: "Medellín" },
        sports: [{ id: "1", name: "Baloncesto", availableFields: 2, availableBookings: 5 }],
        createdById: "1",
      },
      image: null,
    };
  // Fetch data
  let fieldsData: Array<FieldEntity> = Array(10).fill(mockFieldEntity);
  fieldsData = fieldsData.map((item, index) => {
    return {...item, "name": item.name + " " + index.toString()}
  })
  // Hooks
  const navigate = useNavigate();
  const [filteredFieldsData, setFilteredFieldsData] = useState<FieldEntity[]>(
    fieldsData.slice()
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentSearchValue, setCurrentSearchValue] = useState<string>("");

  const filterData = () => {
    setFilteredFieldsData(
      fieldsData.filter((item) => {
        const name = item.name;
        const address = item.address;
        const normalizedSearchValue = searchValue.toLowerCase();
        const concatenatedField = `${name} ${address}`.toLowerCase();
        return concatenatedField.includes(normalizedSearchValue);
      })
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentSearchValue(searchValue);
    console.log("Search Updated: ", currentSearchValue);
    filterData();
    console.log(filteredFieldsData);
  };
  const {isSuccess: eventsSuccess, data: eventsData} = useQuery({
      queryKey: ["events"],
      queryFn: getAvailableEvents,
    });
  const RenderSuggestedEvents = () => (
    <>
      {eventsData!.data.map((event, index) => (
        <Col key={index} className="d-flex justify-content-center">
          <GameCardComponent event={event} />
        </Col>
      ))}
    </>
  );
  return (
    <div className="main_content_container pt-2">
      <Container fluid={"md"}>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            <FormattedMessage id="pages.home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
          <FormattedMessage id="pages.events" />
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row className="mb-3 gy-2">
          <Col>
            <h1 className={`display-5 sh_gold`}><FormattedMessage id="pages.events" /></h1>
          </Col>
        </Row>
        <Row lg={3} md={3} sm={2} xs={1} className="gy-3">
          {filteredFieldsData.map((item, index) => (
              <RenderSuggestedEvents />
          ))}
        </Row>
        {filteredFieldsData.length === 0 && (
          <p>No se encontraron datos para la búsqueda "{currentSearchValue}"</p>
        )}
      </Container>
    </div>
  );
};


export default EventsPage;
