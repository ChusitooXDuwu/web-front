import React, { FC, useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from "./FieldDetailPageMap.module.scss";
import { Breadcrumb, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import FieldDetailEntity from "../../entities/FieldDetailEntity";
import FieldMapCardComponent from "../../components/FieldMapCardComponent/FieldMapCardComponent";
import CustomMap from "../../components/MapComponent/MapComponent";
import { useQuery } from '@tanstack/react-query';
import { getFieldDetails } from '../../services/FieldsServices/FieldsService';

import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';

const FieldDetailPageMap: FC = () => {
  const params = useParams();
  const location = useLocation();
  const { locale } = useContext(LocaleContext);
  const intl = useIntl();
  
  // Extraer ID manualmente de la URL
  const pathParts = location.pathname.split('/');
  const fieldId = pathParts[pathParts.length - 1]; // El último segmento debe ser el ID
  
  console.log('URL path parts:', pathParts);
  console.log('Extracted Field ID:', fieldId);

  // Fetch field details
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['field', fieldId],
    queryFn: () => getFieldDetails(fieldId),
    enabled: !!fieldId && fieldId !== 'map' // Evitar consulta si el ID no es válido
  });

  const field = data?.data;

  // Si está cargando, muestra un spinner
  if (isLoading) {
    return (
      <Container fluid className="main_content_container">
        <Row className={`${styles.title_row} pt-2`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/fields" }}>
              <FormattedMessage id="pages.fields" defaultMessage="Campos" />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <FormattedMessage id="fieldDetailPageMap.loading" defaultMessage="Cargando mapa..." />
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
              <FormattedMessage id="fieldDetailPageMap.loading.details" defaultMessage="Cargando mapa del campo..." />
            </p>
          </Col>
        </Row>
      </Container>
    );
  }

  // Si hay un error, muestra un mensaje de error
  if (isError || !fieldId || fieldId === 'map') {
    return (
      <Container fluid className="main_content_container">
        <Row className={`${styles.title_row} pt-2`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/fields" }}>
              <FormattedMessage id="pages.fields" defaultMessage="Campos" />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <FormattedMessage id="fieldDetailPageMap.error" defaultMessage="Error" />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="justify-content-center my-4">
          <Col md={8}>
            <Alert variant="danger">
              <Alert.Heading>
                <FormattedMessage id="fieldDetailPageMap.error.title" defaultMessage="Error al cargar los datos" />
              </Alert.Heading>
              <p>
                {!fieldId || fieldId === 'map' ? (
                  <FormattedMessage 
                    id="fieldDetailPageMap.error.missingId" 
                    defaultMessage="No se ha especificado un ID de campo válido. Por favor, vuelve a la lista de campos." 
                  />
                ) : (
                  <FormattedMessage 
                    id="fieldDetailPageMap.error.description" 
                    defaultMessage="Ocurrió un error al cargar la información del campo. Intenta nuevamente más tarde." 
                  />
                )}
              </p>
              <div className="d-flex justify-content-between">
                <Link to="/fields" className="btn btn-outline-primary">
                  <FormattedMessage id="fieldDetailPageMap.backToFields" defaultMessage="Volver a la lista de campos" />
                </Link>
                <button 
                  className="btn btn-outline-danger" 
                  onClick={() => window.location.reload()}
                >
                  <FormattedMessage id="fieldDetailPageMap.reload" defaultMessage="Recargar página" />
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
      <Container fluid className="main_content_container">
        <Row className={`${styles.title_row} pt-2`}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
              <FormattedMessage id="pages.home" defaultMessage="Inicio" />
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/fields" }}>
              <FormattedMessage id="pages.fields" defaultMessage="Campos" />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <FormattedMessage id="fieldDetailPageMap.notFound" defaultMessage="Campo no encontrado" />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="justify-content-center my-4">
          <Col md={8}>
            <Alert variant="warning">
              <Alert.Heading>
                <FormattedMessage id="fieldDetailPageMap.notFound.title" defaultMessage="Campo no encontrado" />
              </Alert.Heading>
              <p>
                <FormattedMessage 
                  id="fieldDetailPageMap.notFound.description" 
                  defaultMessage="No se pudo encontrar la información del campo solicitado (ID: {fieldId})." 
                  values={{ fieldId }}
                />
              </p>
              <div className="d-flex justify-content-between">
                <Link to="/fields" className="btn btn-outline-primary">
                  <FormattedMessage id="fieldDetailPageMap.backToFields" defaultMessage="Volver a la lista de campos" />
                </Link>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  // Renderizado normal cuando los datos están disponibles
  return (
    <>
      <Row className={`${styles.title_row} pt-2`} md={12}>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            <FormattedMessage id="pages.home" defaultMessage="Inicio" />
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/fields" }}>
            <FormattedMessage id="pages.fields" defaultMessage="Campos" />
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/fields/${field.id}` }}>
            {field.field_name}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <FormattedMessage id="mapView.mapfrom" defaultMessage="Mapa de" /> {field.field_name}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Container fluid className="main_content_container pt-2 d-flex">
        <Row className={`mb-3 gy-2 ${styles.main_row}`}>
          <Col md={4} className={`${styles.left_col}`}>
            <FieldMapCardComponent field={field} />
          </Col>
          <Col md={8} className={styles.right_col}>
            <CustomMap />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FieldDetailPageMap;