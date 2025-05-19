import React, { FC, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
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
import { Link } from "react-router-dom";
import FieldDetailEntity from "../../entities/FieldDetailEntity";

import { EventType } from "../../services/FieldsServices/FieldsService";

import { ReactComponent as ProfileIcon } from "../../icons/profileIcon.svg";
import UserEntity from "../../entities/user/UserEntity";
import { useQuery } from "@tanstack/react-query";
import {
  getFieldDetails,
  getFieldPrice,
} from "../../services/FieldsServices/FieldsService";

import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";
import { LocaleContext } from "../../contexts/LocaleContext";

// Datos mockeados para los jugadores y eventos (estos podrían venir de otra API)
const mockPlayer: UserEntity = {
  id: "1",
  givenName: "Juan",
  email: "j.name@uniandes.edu.co",
  gender: "Masculino",
  favoriteSports: "Baloncesto",
  phoneNumber: "123456789",
  imageUrl: "/assets/basket_horizontal.jpg",
  lastName: "Perez",
  description: "",
  createdAt: new Date(),
  favoriteCourts: [],
  sports: [],
  friends: [],
};

const mockEvent: EventType = {
  id: "1",
  startTime: new Date(),
  endTime: new Date(),
  currentPlayers: 4,
  maxPlayers: 5,
  sport: {
    id: "1",
    name: "Baloncesto",
    availableFields: 2,
    availableBookings: 5,
  },
  field: {
    id: "3", // ID del Complejo Deportivo El Salitre (type: event) en nuestro Gist
    name: "Cancha de baloncesto",
    address: "Calle 123",
    city: { id: "1", name: "Medellín" },
    sports: [
      { id: "1", name: "Baloncesto", availableFields: 2, availableBookings: 5 },
    ],
    createdById: "1",
  },
  image: null,
};

interface EventDetailPageProps {}

const EventDetailPage: FC<EventDetailPageProps> = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const { locale } = useContext(LocaleContext);
  const intl = useIntl();

  // Para depuración
  console.log("Event ID from params:", eventId);
  console.log("Path:", location.pathname);

  // Obtener el ID del campo desde el evento mockeado
  // En una implementación real, esto vendría de la API de eventos
  const fieldId = mockEvent.field.id;

  // Fetch field details
  const fieldQuery = useQuery({
    queryKey: ["field", fieldId],
    queryFn: () => getFieldDetails(fieldId),
    enabled: !!fieldId,
  });

  // Fetch field price
  const priceQuery = useQuery({
    queryKey: ["fieldPrice", fieldId],
    queryFn: () => getFieldPrice(fieldId),
    enabled: !!fieldId,
  });

  const isLoading = fieldQuery.isLoading || priceQuery.isLoading;
  const isError = fieldQuery.isError || priceQuery.isError;

  const field = fieldQuery.data?.data;
  const price = priceQuery.data?.data || 100; // Valor por defecto si no se obtiene el precio

  // Generar array de participantes según el número actual
  const participantsArray = Array(mockEvent.currentPlayers).fill(mockPlayer);

  // Si está cargando, muestra un spinner
  if (isLoading) {
    return (
      <Container
        fluid
        className={`main_content_container ${styles.main_content}`}
      >
        <Row className={`pt-2 ${styles.title_row}`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/events" }}>
              <FormattedMessage id="pages.events" defaultMessage="Eventos" />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <FormattedMessage
                id="bookingDetailPage.loading"
                defaultMessage="Cargando..."
              />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="justify-content-center my-5">
          <Col className="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">
                <FormattedMessage
                  id="bookingDetailPage.loading"
                  defaultMessage="Cargando..."
                />
              </span>
            </Spinner>
            <p className="mt-3">
              <FormattedMessage
                id="eventDetailPage.loading.details"
                defaultMessage="Cargando detalles del evento..."
              />
            </p>
          </Col>
        </Row>
      </Container>
    );
  }

  // Si hay un error, muestra un mensaje de error
  if (isError) {
    return (
      <Container
        fluid
        className={`main_content_container ${styles.main_content}`}
      >
        <Row className={`pt-2 ${styles.title_row}`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/events" }}>
              <FormattedMessage id="pages.events" defaultMessage="Eventos" />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <FormattedMessage
                id="eventDetailPage.error"
                defaultMessage="Error"
              />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="justify-content-center my-4">
          <Col md={8}>
            <Alert variant="danger">
              <Alert.Heading>
                <FormattedMessage
                  id="eventDetailPage.error.title"
                  defaultMessage="Error al cargar los datos"
                />
              </Alert.Heading>
              <p>
                <FormattedMessage
                  id="eventDetailPage.error.description"
                  defaultMessage="Ocurrió un error al cargar la información del evento. Intenta nuevamente más tarde."
                />
              </p>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => window.location.reload()}
                >
                  <FormattedMessage
                    id="eventDetailPage.reload"
                    defaultMessage="Recargar página"
                  />
                </button>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  // Si no hay datos del campo, muestra un mensaje
  if (!field) {
    return (
      <Container
        fluid
        className={`main_content_container ${styles.main_content}`}
      >
        <Row className={`pt-2 ${styles.title_row}`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/events" }}>
              <FormattedMessage id="pages.events" defaultMessage="Eventos" />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <FormattedMessage
                id="eventDetailPage.notFound"
                defaultMessage="Evento no encontrado"
              />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="justify-content-center my-4">
          <Col md={8}>
            <Alert variant="warning">
              <Alert.Heading>
                <FormattedMessage
                  id="eventDetailPage.notFound.title"
                  defaultMessage="Campo no encontrado"
                />
              </Alert.Heading>
              <p>
                <FormattedMessage
                  id="eventDetailPage.notFound.description"
                  defaultMessage="No se pudo encontrar la información del campo asociado a este evento."
                />
              </p>
              <div className="d-flex justify-content-between">
                <Link to="/events" className="btn btn-outline-primary">
                  <FormattedMessage
                    id="eventDetailPage.backToEvents"
                    defaultMessage="Volver a los eventos"
                  />
                </Link>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  // Renderizado normal cuando todos los datos están disponibles
  return (
    <Container
      fluid
      className={`main_content_container ${styles.main_content}`}
    >
      <Row className={`pt-2 ${styles.title_row}`}>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            <FormattedMessage id="pages.home" defaultMessage="Inicio" />
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/events" }}>
            <FormattedMessage id="pages.events" defaultMessage="Eventos" />
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{field.field_name}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row lg={3} md={3} sm={2} xs={1} className="gy-3 justify-content-center">
        {/* Pasamos los datos del campo y el precio de la API al componente */}
        <FieldDetailCardComponent field={field} price={price} />
      </Row>

      <Row className="justify-content-center">
        <div className={styles.alignedSection}>
          <h2 className={styles.participantTitle}>
            <FormattedMessage
              id="eventDetailPage.participants"
              defaultMessage="Participantes"
            />
            ({mockEvent.currentPlayers}/{mockEvent.maxPlayers}):
          </h2>
          <Col lg={3} md={2} sm={2} xs={1}>
            {participantsArray.map((player, index) => (
              <Col key={index} className={`d-flex ${styles.participantRow}`}>
                <div className={styles.iconContainer}>
                  <ProfileIcon
                    width="35"
                    height="45"
                    style={{ fill: "#E99E14" }}
                  />
                </div>
                <h3 className={styles.participantName}>{player.name}</h3>
              </Col>
            ))}
          </Col>
        </div>
      </Row>
    </Container>
  );
};

export default EventDetailPage;
