import React, { FC } from "react";
import styles from "./CreateFieldPage.module.scss";
import { Breadcrumb, Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateFieldForm from "./CreateFieldForm/CreateFieldForm";
import { FormattedMessage } from "react-intl";
import { useQuery } from "@tanstack/react-query";
import getCities from "../../services/CitiesService/CitiesService";
import getSports from "../../services/SportsService/SportsService";

interface CreateFieldPageProps {}

const CreateFieldPage: FC<CreateFieldPageProps> = () => {
  const { data: citiesData } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  const { data: sportsData } = useQuery({
    queryKey: ["sports"],
    queryFn: getSports,
  });
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
            <CreateFieldForm
              sports={sportsData? sportsData.data: []}
              cities={citiesData ? citiesData.data : []}
            />
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default CreateFieldPage;
