import React, { FC, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './BookingDetailPage.module.scss';
import { Breadcrumb, Container, Row, Col, Button, Form, Spinner, Alert } from "react-bootstrap";
import FieldDetailCardComponent from "../../components/FieldDetailCardComponent/FieldDetailCardComponent";
import { Link } from "react-router-dom";
import FieldDetailEntity from "../../entities/FieldDetailEntity";
import BookingCard from "../../components/BookingCard/BookingCard";
import GameCardComponent from '../../components/GameCardComponent/GameCardComponents';
import { EventType } from '../../services/FieldsServices/FieldsService';
import UserEntity from '../../entities/UserEntity';
import { ReactComponent as ProfileIcon } from "../../icons/profileIcon.svg";
import { useQuery } from '@tanstack/react-query';
import { getFieldDetails, getFieldPrice } from '../../services/FieldsServices/FieldsService';

import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';

// Datos mockeados para los jugadores y eventos (estos podrían venir de otra API)
const mockPlayer: UserEntity = {
  id: "1",
  name: "Juan",
  email: "j.name@uniandes.edu.co",
  gender: "Masculino",
  favorite_sports: "Baloncesto",
  phone_number: "123456789",
  image_url: "/assets/basket_horizontal.jpg"
}

const mockEvent: EventType = {
  id: "1",
  startTime: new Date(),
  endTime: new Date(),
  currentPlayers: 4,
  maxPlayers: 5,
  sport: { id: "1", name: "Baloncesto", available_fields: 2, available_bookings: 5 },
  field: {
    id: "1",
    name: "Cancha de baloncesto",
    address: "Calle 123",
    city: { id: "1", name: "Medellín" },
    sports: [{ id: "1", name: "Baloncesto", available_fields: 2, available_bookings: 5 }],
    createdById: "1",
  },
  image: null,
};

interface BookingDetailPageProps { }

const BookingDetailPage: FC<BookingDetailPageProps> = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const { locale } = useContext(LocaleContext);
  const intl = useIntl();

  // Para depuración
  console.log('Booking ID from params:', bookingId);
  console.log('Path:', location.pathname);

  // Obtener el ID del campo desde el evento mockeado
  // En una implementación real, esto vendría de la API de reservas
  const fieldId = mockEvent.field.id;

  // Fetch field details
  const fieldQuery = useQuery({
    queryKey: ['field', fieldId],
    queryFn: () => getFieldDetails(fieldId),
    enabled: !!fieldId
  });

  // Fetch field price
  const priceQuery = useQuery({
    queryKey: ['fieldPrice', fieldId],
    queryFn: () => getFieldPrice(fieldId),
    enabled: !!fieldId
  });

  const isLoading = fieldQuery.isLoading || priceQuery.isLoading;
  const isError = fieldQuery.isError || priceQuery.isError;
  
  const field = fieldQuery.data?.data;
  const price = priceQuery.data?.data || 100; // Valor por defecto si no se obtiene el precio

  const bookingArray = Array(mockEvent.currentPlayers).fill(mockPlayer);
  const [isSplit, setIsSplit] = useState(false);
  const priceToShow = isSplit ? (price / mockEvent.currentPlayers).toFixed(2) : price;

  const handlePayment = (bank: string) => {
    alert("Pagando por el método de pago: " + bank);
  }

  // Si está cargando, muestra un spinner
  if (isLoading) {
    return (
      <Container fluid className={`main_content_container ${styles.main_content}`}>
        <Row className={`pt-2 ${styles.title_row}`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/bookings" }}>
              <FormattedMessage id="pages.bookings" defaultMessage="Reservas" />
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
              <FormattedMessage id="bookingDetailPage.loading.details" defaultMessage="Cargando detalles de la reserva..." />
            </p>
          </Col>
        </Row>
      </Container>
    );
  }

  // Si hay un error, muestra un mensaje de error
  if (isError) {
    return (
      <Container fluid className={`main_content_container ${styles.main_content}`}>
        <Row className={`pt-2 ${styles.title_row}`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/bookings" }}>
              <FormattedMessage id="pages.bookings" defaultMessage="Reservas" />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <FormattedMessage id="bookingDetailPage.error" defaultMessage="Error" />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="justify-content-center my-4">
          <Col md={8}>
            <Alert variant="danger">
              <Alert.Heading>
                <FormattedMessage id="bookingDetailPage.error.title" defaultMessage="Error al cargar los datos" />
              </Alert.Heading>
              <p>
                <FormattedMessage 
                  id="bookingDetailPage.error.description" 
                  defaultMessage="Ocurrió un error al cargar la información de la reserva. Intenta nuevamente más tarde." 
                />
              </p>
              <div className="d-flex justify-content-end">
                <button 
                  className="btn btn-outline-danger" 
                  onClick={() => window.location.reload()}
                >
                  <FormattedMessage id="bookingDetailPage.reload" defaultMessage="Recargar página" />
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
      <Container fluid className={`main_content_container ${styles.main_content}`}>
        <Row className={`pt-2 ${styles.title_row}`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/bookings" }}>
              <FormattedMessage id="pages.bookings" defaultMessage="Reservas" />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <FormattedMessage id="bookingDetailPage.notFound" defaultMessage="Reserva no encontrada" />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="justify-content-center my-4">
          <Col md={8}>
            <Alert variant="warning">
              <Alert.Heading>
                <FormattedMessage id="bookingDetailPage.notFound.title" defaultMessage="Campo no encontrado" />
              </Alert.Heading>
              <p>
                <FormattedMessage 
                  id="bookingDetailPage.notFound.description" 
                  defaultMessage="No se pudo encontrar la información del campo asociado a esta reserva." 
                />
              </p>
              <div className="d-flex justify-content-between">
                <Link to="/bookings" className="btn btn-outline-primary">
                  <FormattedMessage id="bookingDetailPage.backToBookings" defaultMessage="Volver a mis reservas" />
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
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/bookings" }}>
            <FormattedMessage id="pages.bookings" defaultMessage="Reservas" />
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{field.field_name}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      
      <Row lg={3} md={3} sm={2} xs={1} className="gy-3 justify-content-center">
        {/* Pasamos los datos del campo y el precio de la API al componente */}
        <FieldDetailCardComponent field={field} price={price} />
      </Row>
      
      <Row className="px-4">
        <Col lg={3} md={6} sm={12} xs={12}>
          <h2 className={styles.participantTitle}>
            <FormattedMessage id="eventDetailPage.participants" defaultMessage="Participantes" /> 
            ({mockEvent.currentPlayers}/{mockEvent.maxPlayers}):
          </h2>
          {bookingArray.map((player, index) => (
            <Col key={index} className={`d-flex ${styles.participantRow}`}>
              <div className={styles.iconContainer}>
                <ProfileIcon width="35" height="45" style={{ fill: "#E99E14" }} />
              </div>
              <h3 className={styles.participantName}>{player.name}</h3>
            </Col>
          ))}
        </Col>

        <Col className={`${styles.priceColumn} d-flex flex-column align-items-center justify-content-center px-4`}>
          <Form.Group controlId="splitPriceCheckbox" className="text-center">
            <Form.Check
              type="checkbox"
              label="Dividir precio entre jugadores"
              checked={isSplit}
              onChange={() => setIsSplit(!isSplit)}
              className={styles.checkbox}
            />
          </Form.Group>

          {/* Display Calculated Price */}
          <h3 className={styles.priceText}>Precio: ${priceToShow}</h3>
          <h3 className={styles.selectText}>Selecciona cómo deseas pagar</h3>

          {/* Image Below Price */}
          <div className={styles.imageWrapper}>
            <img src="https://ccce.org.co/wp-content/uploads/2019/09/consejo-ccce-payu.jpg" alt="Pago PayU" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
            <img src="https://d31dn7nfpuwjnm.cloudfront.net/images/valoraciones/0039/6155/Qu%C3%A9_es_Nequi_y_c%C3%B3mo_funciona.jpg?1598852798" alt="Pago Nequi" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
            <img src="https://www.sifer.com.co/wp-content/uploads/2021/02/pse-forma.jpg" alt="Pago PSE" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
            <img src="https://play-lh.googleusercontent.com/fIwuxVTuoLOzhrKJL6GCGIKuEJc6JFu9Ii97cp0nFWE61qpfeaIhFBiNL5wFcydvhQA" alt="Pago DaviPlata" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
          </div>
          <div className={styles.imageWrapper}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlhi5rxI9Fcyi4s0Y-nZM3FFvDX1asdLYOgA&s" alt="Mercado Pago" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0cWaCbny3YjfPiMmFHZkwXpf-8nUrnqIU2w&s" alt="Mastercard" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
            <img src="https://bulevar.com.co/wp-content/uploads/2023/07/bancolombia.jpg" alt="Bancolombia" className={styles.priceImage} onClick={(e) => handlePayment((e.target as HTMLImageElement).alt)} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingDetailPage;