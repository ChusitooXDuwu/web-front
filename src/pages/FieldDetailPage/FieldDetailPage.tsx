import React, { FC, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './FieldDetailPage.module.scss';
import { Breadcrumb, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import FieldDetailCardComponent from "../../components/FieldDetailCardComponent/FieldDetailCardComponent";
import { Link } from "react-router-dom";
import GameCardComponent from '../../components/GameCardComponent/GameCardComponents';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';
import { useQuery } from '@tanstack/react-query';
import { getFieldById, getFieldPrice } from '../../services/FieldsServices/FieldsService';
import { getAvailableEvents } from '../../services/EventsService/EventsService';
import { EventEntityDto } from '../../entities/EventEntity';

interface FieldDetailPageProps { }

const FieldDetailPage: FC<FieldDetailPageProps> = () => {
  const params = useParams();
  const location = useLocation();
  const { locale } = useContext(LocaleContext);
  const intl = useIntl();

  // Extract fieldId from URL params
  const fieldId = params.id;

  // Fetch field details
  const fieldQuery = useQuery({
    queryKey: ['field', fieldId],
    queryFn: () => getFieldById(fieldId || ''),
    enabled: !!fieldId,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch field price
  const priceQuery = useQuery({
    queryKey: ['fieldPrice', fieldId],
    queryFn: () => getFieldPrice(fieldId || ''),
    enabled: !!fieldId,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch all available events
  const eventsQuery = useQuery({
    queryKey: ['events'],
    queryFn: getAvailableEvents,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const isLoading = fieldQuery.isLoading || priceQuery.isLoading || eventsQuery.isLoading;
  const isError = fieldQuery.isError || priceQuery.isError || eventsQuery.isError;
  const error = fieldQuery.error || priceQuery.error || eventsQuery.error;

  const fieldData = fieldQuery.data;
  const field = fieldData?.data;
  const price = priceQuery.data?.data || 0;

  // Filter events for this specific field
  const fieldEvents = eventsQuery.data?.data?.filter(
    (event: EventEntityDto) => event.field?.id === fieldId
  ) || [];

  // Handle error state
  if (isError) {
    return (
      <Container fluid className={`main_content_container ${styles.main_content}`}>
        <Row className={`pt-2 ${styles.title_row}`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/fields" }}>
              <FormattedMessage id="pages.fields" defaultMessage="Campos" />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <FormattedMessage id="fieldDetailPage.error" defaultMessage="Error" />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="justify-content-center my-4">
          <Col md={8}>
            <Alert variant="danger">
              <Alert.Heading>
                <FormattedMessage id="fieldDetailPage.error.title" defaultMessage="Error al cargar los datos" />
              </Alert.Heading>
              <p>
                {error instanceof Error
                  ? error.message
                  : <FormattedMessage
                    id="fieldDetailPage.error.description"
                    defaultMessage="Ocurrió un error al cargar la información del campo. Intenta nuevamente más tarde."
                  />
                }
              </p>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    fieldQuery.refetch();
                    priceQuery.refetch();
                    eventsQuery.refetch();
                  }}
                >
                  <FormattedMessage id="fieldDetailPage.reload" defaultMessage="Recargar página" />
                </button>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  // Handle loading state
  if (isLoading) {
    return (
      <Container fluid className={`main_content_container ${styles.main_content}`}>
        <Row className={`pt-2 ${styles.title_row}`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/fields" }}>
              <FormattedMessage id="pages.fields" defaultMessage="Campos" />
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
              <FormattedMessage id="fieldDetailPage.loading.details" defaultMessage="Cargando detalles del campo..." />
            </p>
          </Col>
        </Row>
      </Container>
    );
  }

  // Handle no data state
  if (!field) {
    return (
      <Container fluid className={`main_content_container ${styles.main_content}`}>
        <Row className={`pt-2 ${styles.title_row}`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/fields" }}>
              <FormattedMessage id="pages.fields" defaultMessage="Campos" />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <FormattedMessage id="fieldDetailPage.notFound" defaultMessage="Campo no encontrado" />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="justify-content-center my-4">
          <Col md={8}>
            <Alert variant="warning">
              <Alert.Heading>
                <FormattedMessage id="fieldDetailPage.notFound.title" defaultMessage="Campo no encontrado" />
              </Alert.Heading>
              <p>
                <FormattedMessage
                  id="fieldDetailPage.notFound.description"
                  defaultMessage="No se pudo encontrar la información del campo con el ID: {fieldId}"
                  values={{ fieldId: fieldId || 'no especificado' }}
                />
              </p>
              <div className="d-flex justify-content-between">
                <Link to="/fields" className="btn btn-outline-primary">
                  <FormattedMessage id="fieldDetailPage.backToFields" defaultMessage="Volver a la lista de campos" />
                </Link>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  // Render the field details when data is available
  return (
    <Container fluid className={`main_content_container ${styles.main_content}`}>
      <Row className={`pt-2 ${styles.title_row}`}>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            <FormattedMessage id="pages.home" defaultMessage="Inicio" />
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/fields" }}>
            <FormattedMessage id="pages.fields" defaultMessage="Campos" />
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{field.field_name}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row lg={3} md={3} sm={2} xs={1} className="gy-3 justify-content-center">
        <FieldDetailCardComponent field={field} price={price} />
      </Row>

      <Row className="justify-content-center mt-4">
        <div className={styles.alignedSection}>
          <h2>
            <FormattedMessage
              id="fieldDetailCard.details.availableBookings"
              defaultMessage="Reservas disponibles"
            />
          </h2>
          <Row lg={3} md={2} sm={2} xs={1} className="gy-2">
            {eventsQuery.isLoading ? (
              <Col className="text-center">
                <Spinner animation="border" role="status" variant="primary">
                  <span className="visually-hidden">
                    <FormattedMessage id="fieldDetailPage.loading.events" defaultMessage="Cargando eventos..." />
                  </span>
                </Spinner>
              </Col>
            ) : eventsQuery.isError ? (
              <Col className="text-center">
                <Alert variant="danger">
                  <FormattedMessage
                    id="fieldDetailPage.error.events"
                    defaultMessage="Error al cargar los eventos"
                  />
                </Alert>
              </Col>
            ) : fieldEvents.length > 0 ? (
              fieldEvents.map((event: EventEntityDto) => (
                <Col key={event.id} className="d-flex justify-content-center">
                  <GameCardComponent event={event} />
                </Col>
              ))
            ) : (
              <Col className="text-center">
                <p>
                  <FormattedMessage
                    id="fieldDetailCard.details.noEvents"
                    defaultMessage="No hay eventos disponibles para este campo"
                  />
                </p>
              </Col>
            )}
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default FieldDetailPage;
