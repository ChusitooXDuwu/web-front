import React, { FC } from "react";
import styles from "./CreateFieldPage.module.scss";
import { Breadcrumb, Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateFieldForm from "./CreateFieldForm/CreateFieldForm";
import { FormattedMessage } from "react-intl";
import SportEntity from "../../entities/SportEntity";
import { useQuery } from "@tanstack/react-query";
import getCities from "../../services/CitiesService/CitiesService";

interface CreateFieldPageProps {}

const CreateFieldPage: FC<CreateFieldPageProps> = () => {
  const { data: citiesData } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  const mockSports: SportEntity[] = [
    { id: "1", name: "Fútbol", availableFields: 2, availableBookings: 5 },
    { id: "2", name: "Baloncesto", availableFields: 2, availableBookings: 2 },
    { id: "3", name: "Tenis", availableFields: 3, availableBookings: 5 },
    { id: "4", name: "Voleibol", availableFields: 1, availableBookings: 3 },
    { id: "5", name: "Padel 🏳️‍🌈", availableFields: 6, availableBookings: 8 },
    { id: "6", name: "Squash", availableFields: 6, availableBookings: 8 },
    { id: "7", name: "Futbol-5", availableFields: 6, availableBookings: 8 },
    { id: "8", name: "Patinaje", availableFields: 6, availableBookings: 8 },
  ];
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
              sports={mockSports}
              cities={citiesData ? citiesData.data : []}
            />
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default CreateFieldPage;
