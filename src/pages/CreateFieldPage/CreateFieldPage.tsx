import React, { FC } from "react";
import styles from "./CreateFieldPage.module.scss";
import { Breadcrumb, Card, Container, Row, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateFieldForm from "./CreateFieldForm/CreateFieldForm";
import { FormattedMessage } from "react-intl";
import { useQuery } from "@tanstack/react-query";
import getCities from "../../services/CitiesService/CitiesService";
import getSports from "../../services/SportsService/SportsService";

interface CreateFieldPageProps { }

const CreateFieldPage: FC<CreateFieldPageProps> = () => {
  // Consulta para obtener ciudades
  const {
    data: citiesData,
    isLoading: isCitiesLoading,
    error: citiesError
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  // Consulta para obtener deportes
  const {
    data: sportsData,
    isLoading: isSportsLoading,
    error: sportsError
  } = useQuery({
    queryKey: ["sports"],
    queryFn: getSports,
  });

  // Verificar si hay errores o si los datos están cargando
  const isLoading = isCitiesLoading || isSportsLoading;
  const hasError = citiesError || sportsError;

  return (
    <Container fluid className={`main_content_container`}>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            <FormattedMessage id="pages.home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/fields" }}>
            <FormattedMessage id="pages.fields" />
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <FormattedMessage id="pages.fields.create" />
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row className="justify-content-center px-3">
        <Card className={styles.form_card}>
          <Card.Header>
            <FormattedMessage id="fields.create.title" />
          </Card.Header>
          <Card.Body>
            {isLoading && (
              <div className="text-center my-4">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p className="mt-2">Cargando datos necesarios...</p>
              </div>
            )}

            {hasError && (
              <Alert variant="danger">
                Error al cargar los datos necesarios. Por favor, intenta de nuevo más tarde.
              </Alert>
            )}

            {!isLoading && !hasError && (
              <CreateFieldForm
                sports={sportsData ? sportsData.data : []}
                cities={citiesData ? citiesData.data : []}
              />
            )}
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default CreateFieldPage;