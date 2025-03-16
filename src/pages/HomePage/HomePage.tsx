import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BookingCard from "../../components/BookingCard/BookingCard";
import GameCardComponent from "../../components/GameCardComponent/GameCardComponents";
import { EventEntity } from "../../entities/Entities";
import { getMyBookings } from "../../services/BookingsService/BookingsService";
import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

interface noDataCardProps {
  dataName: string;
  actionPrompt: string;
  link: string;
}

const NoDataCard: FC<noDataCardProps> = ({ dataName, actionPrompt, link }) => {
  const navigate = useNavigate();
  const navToLink = () => navigate(link);
  return (
    <Card>
      <Card.Body className="text-center">
        <FormattedMessage id="home.noData" values={{ dataName }} />
        <Button variant="outline-primary" size="sm" onClick={navToLink}>
          {actionPrompt}
        </Button>{" "}
      </Card.Body>
    </Card>
  );
};

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const { formatMessage } = useIntl();
  const mockEvent: EventEntity = {
    id: "1",
    startTime: new Date(),
    endTime: new Date(),
    currentPlayers: 4,
    maxPlayers: 5,
    sport: {
      id: "1",
      name: "Baloncesto",
      available_fields: 2,
      available_bookings: 5,
    },
    field: {
      id: "1",
      name: "Cancha de baloncesto",
      address: "Calle 123",
      city: { id: "1", name: "Medellín" },
      sports: [
        {
          id: "1",
          name: "Baloncesto",
          available_fields: 2,
          available_bookings: 5,
        },
      ],
      createdById: "1",
    },
    image: null,
  };
  const { isSuccess, data } = useQuery({
    queryKey: ["bookings"],
    queryFn: getMyBookings,
  });
  let upcomingEvents = isSuccess
    ? data.data.sort((a, b) => {
        return a.startDateTime.getTime() - b.startDateTime.getTime();
      })
    : [];
  let suggestedEvents = Array(10).fill(mockEvent);
  // debug
  // upcomingEvents = [];
  // suggestedEvents = []
  // debug
  const topUpcomingEvents = upcomingEvents.slice(0, 3);
  const RenderSuggestedEvents = () => (
    <>
      {suggestedEvents.map((event, index) => (
        <Col key={index} className="d-flex justify-content-center">
          <GameCardComponent event={event} />
        </Col>
      ))}
    </>
  );
  const RenderUpcomingEvents = () => (
    <>
      {topUpcomingEvents.map((event, index) => (
        <Col key={index} className="d-flex justify-content-center">
          <BookingCard bookedEvent={event!} />
        </Col>
      ))}
    </>
  );
  return (
    <Container fluid className={"main_content_container"}>
      <Container fluid={"md"}>
        <section>
          <h1 className={styles.section_header}>
            <FormattedMessage id="home.title.upcoming" />
          </h1>
          <Row xs={1} className="gy-2 text-center">
            {upcomingEvents.length > 0 ? (
              <>
                <RenderUpcomingEvents />
                {upcomingEvents.length > topUpcomingEvents.length && (
                  <p>
                    <FormattedMessage
                      id="home.link.totalBookings"
                      values={{ bookings: upcomingEvents.length }}
                    />{" "}
                    <Link to={"/bookings"}>
                      <FormattedMessage id="home.link.bookings" />
                    </Link>{" "}
                  </p>
                )}
              </>
            ) : (
              <NoDataCard
                dataName={formatMessage({ id: "home.data.upcomingEvents" })}
                actionPrompt={formatMessage({ id: "home.prompt.addEvent" })}
                link="/events"
              />
            )}
          </Row>
        </section>
        <section>
          <h1 className={styles.section_header}>
            <FormattedMessage id="home.title.available" />
          </h1>
          {suggestedEvents.length > 0 ? (
            <Row lg={3} md={2} sm={2} xs={1} className="gy-2">
              <RenderSuggestedEvents />
            </Row>
          ) : (
            <Row>
              <NoDataCard
                dataName={formatMessage({ id: "home.data.availableEvents" })}
                actionPrompt={formatMessage({ id: "home.prompt.searchEvent" })}
                link="/events"
              />
            </Row>
          )}
        </section>
      </Container>
    </Container>
  );
};

export default HomePage;
