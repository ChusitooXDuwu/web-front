import React, { FC } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import styles from "./EventDetailPage.module.scss";
import {
  Breadcrumb,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import FieldDetailCardComponent from "../../components/FieldDetailCardComponent/FieldDetailCardComponent";
import { useQuery } from "@tanstack/react-query";
import {
  getFieldPrice,
} from "../../services/FieldsServices/FieldsService";
import { FormattedMessage, useIntl } from "react-intl";
import { LocaleContext } from "../../contexts/LocaleContext";
import { getEventById } from "../../services/EventsService/EventsService";
import { ReactComponent as ProfileIcon } from "../../icons/profileIcon.svg";
import EventDetailCard from "../../components/FieldDetailCardComponent/EventDetailCardComponent";

const EventDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const intl = useIntl();

  // Fetch event data using the ID from URL params
  const eventQuery = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id as string),
    enabled: !!id, // Only run if ID exists
  });

  // Get field data from the event response when available
  const event = eventQuery.data?.data;
  console.log(event)
  const fieldId = event?.id;

  // Fetch field price when we have the fieldId
  const priceQuery = useQuery({
    queryKey: ["fieldPrice", fieldId],
    queryFn: () => getFieldPrice(fieldId as string),
    enabled: !!fieldId,
  });

  const isLoading = eventQuery.isLoading || priceQuery.isLoading;
  const isError = eventQuery.isError || priceQuery.isError;
  const price = priceQuery.data?.data || 100; // Default price if not fetched

  // If loading, show spinner
  if (isLoading) {
    return (
      <Container fluid className={`main_content_container ${styles.main_content}`}>
        <Row className={`pt-2 ${styles.title_row}`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/events" }}>
              <FormattedMessage id="pages.events" defaultMessage="Eventos" />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <FormattedMessage id="bookingDetailPage.loading" defaultMessage="Cargando..." />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="justify-content-center my-5">
          <Col className="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">
                <FormattedMessage id="bookingDetailPage.loading" defaultMessage="Cargando..." />
              </span>
            </Spinner>
            <p className="mt-3">
              <FormattedMessage id="eventDetailPage.loading.details" defaultMessage="Cargando detalles del evento..." />
            </p>
          </Col>
        </Row>
      </Container>
    );
  }

  // If error, show error message
  if (isError) {
    return (
      <Container fluid className={`main_content_container ${styles.main_content}`}>
        <Row className={`pt-2 ${styles.title_row}`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/events" }}>
              <FormattedMessage id="pages.events" defaultMessage="Eventos" />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <FormattedMessage id="eventDetailPage.error" defaultMessage="Error" />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="justify-content-center my-4">
          <Col md={8}>
            <Alert variant="danger">
              <Alert.Heading>
                <FormattedMessage id="eventDetailPage.error.title" defaultMessage="Error al cargar los datos" />
              </Alert.Heading>
              <p>
                <FormattedMessage id="eventDetailPage.error.description" defaultMessage="Ocurrió un error al cargar la información del evento. Intenta nuevamente más tarde." />
              </p>
              <div className="d-flex justify-content-end">
                <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
                  <FormattedMessage id="eventDetailPage.reload" defaultMessage="Recargar página" />
                </button>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  // If no event data, show not found message
  if (!event) {
    return (
      <Container fluid className={`main_content_container ${styles.main_content}`}>
        <Row className={`pt-2 ${styles.title_row}`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/events" }}>
              <FormattedMessage id="pages.events" defaultMessage="Eventos" />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <FormattedMessage id="eventDetailPage.notFound" defaultMessage="Evento no encontrado" />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="justify-content-center my-4">
          <Col md={8}>
            <Alert variant="warning">
              <Alert.Heading>
                <FormattedMessage id="eventDetailPage.notFound.title" defaultMessage="Evento no encontrado" />
              </Alert.Heading>
              <p>
                <FormattedMessage id="eventDetailPage.notFound.description" defaultMessage="No se pudo encontrar la información del evento solicitado." />
              </p>
              <div className="d-flex justify-content-between">
                <Link to="/events" className="btn btn-outline-primary">
                  <FormattedMessage id="eventDetailPage.backToEvents" defaultMessage="Volver a los eventos" />
                </Link>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  // Render normal view when all data is available
  return (
    <Container fluid className={`main_content_container ${styles.main_content}`}>
      <Row className={`pt-2 ${styles.title_row}`}>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            <FormattedMessage id="pages.home" defaultMessage="Inicio" />
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/events" }}>
            <FormattedMessage id="pages.events" defaultMessage="Eventos" />
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{event.field?.fieldName || event.field?.name}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row lg={3} md={3} sm={2} xs={1} className="gy-3 justify-content-center">
        {event.field ? (
    // Only render the component if field exists
    <EventDetailCard evento={event} price={price} />
  ) : (
    <Col className="text-center">
      <Alert variant="warning">
        <FormattedMessage 
          id="eventDetailPage.noFieldData" 
          defaultMessage="La información del campo no está disponible" 
        />
      </Alert>
    </Col>
  )}
      </Row>

      <Row className="justify-content-center">
        <div className={styles.alignedSection}>
          <h2 className={styles.participantTitle}>
            <FormattedMessage id="eventDetailPage.participants" defaultMessage="Participantes" />
            ({event.currentParticipants}/{event.maxParticipants}):
          </h2>
          <Col lg={3} md={2} sm={2} xs={1}>
            {event.participants && event.participants.map((participant, index) => (
              <Col key={index} className={`d-flex ${styles.participantRow}`}>
                <div className={styles.iconContainer}>
                  <ProfileIcon width="35" height="45" style={{ fill: "#E99E14" }} />
                </div>
                <h3 className={styles.participantName}>
                  {participant.givenName} {participant.lastName}
                </h3>
              </Col>
            ))}
            {(!event.participants || event.participants.length === 0) && (
              <p><FormattedMessage id="eventDetailPage.noParticipants" defaultMessage="No hay participantes registrados aún" /></p>
            )}
          </Col>
        </div>
      </Row>
    </Container>
  );
};

export default EventDetailPage;