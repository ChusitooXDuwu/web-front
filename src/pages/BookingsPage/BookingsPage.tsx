import { FC } from "react";
import styles from "./BookingsPage.module.scss";
import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
import BookingCard from "../../components/BookingCard/BookingCard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../../services/BookingsService/BookingsService";
import { FormattedMessage } from "react-intl";
import { getEventsByUserId, getEventsFromUser } from "../../services/EventsService/EventsService";
import { useProfile } from "../../contexts/ProfileContext";
import GameCardComponent from "../../components/GameCardComponent/GameCardComponents";
import { SportEntity } from "../../entities/Entities";
import { EventEntityDto } from "../../entities/EventEntity";

interface BookingsPageProps {}

const BookingsPage: FC<BookingsPageProps> = () => {

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

  const user = useProfile()
  console.log(user)
  const id = "c321d3af-ad0e-49da-9d43-7ddc82a3321e";
  console.log(id)


  const { isSuccess: eventsSuccess, data: eventsData } = useQuery({
    queryKey: ["events", id], // Include id in the query key for proper caching
    queryFn: () => getEventsFromUser(id as string), // This is a function that RETURNS a Promise
    enabled: !!id, // Only run the query if id exists
  });

  const event = eventsData?.data;
  console.log(event)
  return (
    <div className="main_content_container pt-2">
      <Container fluid={"md"}>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            <FormattedMessage id="pages.home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <FormattedMessage id="pages.bookings" />
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row className="mb-3 gy-2">
          <Col>
            <h1 className={`display-5 sh_gold`}>
              <FormattedMessage id="pages.bookings" />
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
            <h1>No evetns</h1>}
        </Row>

        {eventsSuccess && eventsData?.data?.length === 0 && (
          <p>No events found</p>
        )}
      </Container>
    </div>
  );
};

export default BookingsPage;
