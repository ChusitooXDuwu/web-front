import React, { FC, useContext, useEffect } from 'react';
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
import { getFieldDetails, getFieldPrice, getFieldEvents, EventType } from '../../services/FieldsServices/FieldsService';

interface FieldDetailPageProps {}

const FieldDetailPage: FC<FieldDetailPageProps> = () => {
  // Métodos alternativos para obtener el ID

  
  
  const params = useParams();
  const location = useLocation();

  console.log('ALL PARAMS:', params);
  console.log('Params type:', typeof params);
  console.log('Params keys:', Object.keys(params));
  console.log('Raw URL:', window.location.pathname)
  
  // Extraer fieldId de diferentes formas posibles
  let fieldId: string | undefined;
  
  // Método 1: directo de useParams
  fieldId = params.fieldId;
  
  // Método 2: analizando la URL manualmente si el método 1 falla
  if (!fieldId) {
    const pathParts = location.pathname.split('/');
    fieldId = pathParts[pathParts.length - 1];
    if (fieldId === 'fields') fieldId = undefined;
  }
  
  // Método 3: usar un ID por defecto para pruebas si todo lo demás falla
  const actualId = fieldId || '1';
  
  console.log('Debug info:');
  console.log('- Raw params:', params);
  console.log('- Path:', location.pathname);
  console.log('- Extracted fieldId:', fieldId);
  console.log('- Using ID:', actualId);

  const { locale } = useContext(LocaleContext);
  const intl = useIntl();

  // Fetch field details
  const fieldQuery = useQuery({
    queryKey: ['field', actualId],
    queryFn: () => getFieldDetails(actualId),
    enabled: true // Siempre habilitado con el ID actual (o por defecto)
  });

  // Fetch field price
  const priceQuery = useQuery({
    queryKey: ['fieldPrice', actualId],
    queryFn: () => getFieldPrice(actualId),
    enabled: true
  });

  // Fetch available events for this field
  const eventsQuery = useQuery({
    queryKey: ['fieldEvents', actualId],
    queryFn: () => getFieldEvents(actualId),
    enabled: true
  });

  const isLoading = fieldQuery.isLoading || priceQuery.isLoading || eventsQuery.isLoading;
  const isError = fieldQuery.isError || priceQuery.isError || eventsQuery.isError;
  
  const fieldData = fieldQuery.data;
  const field = fieldData?.data;
  const price = priceQuery.data?.data || 0;
  const events = eventsQuery.data?.data || [];

  // Si hay un error, muestra un mensaje de error
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
                <FormattedMessage 
                  id="fieldDetailPage.error.description" 
                  defaultMessage="Ocurrió un error al cargar la información del campo. Intenta nuevamente más tarde." 
                />
              </p>
              <div className="d-flex justify-content-end">
                <button 
                  className="btn btn-outline-danger" 
                  onClick={() => window.location.reload()}
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

  // Si está cargando, muestra un spinner
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
              <FormattedMessage id="fieldDetailPage.loading" defaultMessage="Cargando..." />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="justify-content-center my-5">
          <Col className="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">
                <FormattedMessage id="fieldDetailPage.loading" defaultMessage="Cargando..." />
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

  // Si no hay datos, muestra un mensaje
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

  // Renderiza el contenido normal cuando los datos están disponibles
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
            {events.length > 0 ? (
              events.map((event: EventType, index: number) => (
                <Col key={index} className="d-flex justify-content-center">
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
