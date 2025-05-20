import { FC } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FieldEntity, SportEntity } from "../../entities/Entities";
import { useQuery } from "@tanstack/react-query";
import GameCardComponent from "../../components/GameCardComponent/GameCardComponents";
import { getAvailableEvents } from "../../services/EventsService/EventsService";
import { FormattedMessage } from "react-intl";
import { EventEntityDto } from "../../entities/EventEntity";

interface EventsPageProps { }

const EventsPage: FC<EventsPageProps> = () => {
  // Mock data for fallback display
  const mockSports: SportEntity[] = [
    {
      id: "1",
      name: "Soccer",
      availableFields: 2,
      availableBookings: 5,
    },
    {
      id: "2",
      name: "Basketball",
      availableFields: 2,
      availableBookings: 2,
    },
  ];

  const mockEvent: EventEntityDto = {
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    eventStartDateTime: new Date(),
    eventEndDateTime: new Date(Date.now() + 3600000),
    maxParticipants: 10,
    currentParticipants: 5,
    sport: {
      id: "1",
      name: "Fútbol",
      fields: [],
      events: []
    },
    field: {
      id: "1",
      name: "Cancha Principal",
      fieldName: "Cancha Principal",
      field_name: "Cancha Principal",
      cityName: "Bogotá",
      address: "Calle 123",
      city: {
        id: "1",
        name: "Bogotá"
      },
      sports: [],
      createdById: "1",
      imageUrl: "/assets/default-field.jpg",
      image_url: "/assets/default-field.jpg",
      field_rating: 4.5,
      phone_number: "1234567890",
      opening_time: "08:00",
      isBooking: true,
      field_type: "Fútbol"
    },
    image: "/assets/default-event.jpg",
    participants: []
  };

  // Fetch real events data
  const { isSuccess: eventsSuccess, data: eventsData } = useQuery({
    queryKey: ["events"],
    queryFn: getAvailableEvents,
  });

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
            <h1 className={`display-5 sh_gold`}>
              <FormattedMessage id="pages.events" />
            </h1>
          </Col>
        </Row>

        <Row lg={3} md={3} sm={2} xs={1} className="gy-3">
          {eventsSuccess && eventsData?.data
            ? // Display real events when available
            eventsData.data.map((event, index) => (
              <Col key={index} className="d-flex justify-content-center">
                <GameCardComponent event={event} />
              </Col>
            ))
            : // Display 3 mock events as fallback
            Array(3)
              .fill(null)
              .map((_, index) => (
                <Col key={index} className="d-flex justify-content-center">
                  <GameCardComponent event={mockEvent} />
                </Col>
              ))}
        </Row>

        {eventsSuccess && eventsData?.data?.length === 0 && (
          <p>No events found</p>
        )}
      </Container>
    </div>
  );
};

export default EventsPage;
