import React, { FC } from 'react';
import styles from './SportsPage.module.scss';
import { Breadcrumb, Container, Row, Col} from "react-bootstrap";
import SportCard from "../../components/SportCard/SportCard";
import SportEntity from "../../entities/SportEntity";
import { Link } from "react-router-dom";

import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';
import { useState } from 'react';
import { useContext } from 'react';


// TODO REPLACE WITH API FETCH
const mockData: SportEntity = {
  id: "abc",

  name: "Basketball",
  availableFields: 2,
  availableBookings: 5

};

interface SportsPageProps {}

const SportsPage: FC<SportsPageProps> = () => {
  const SportArray: any[] = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  const { locale } = useContext(LocaleContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const intl = useIntl();
  const { formatMessage } = intl;
  return (
    <Container
      fluid
      className={`main_content_container ${styles.main_content}`}
    >
      <Row className={`pt-2 ${styles.title_row}`}>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            <FormattedMessage id="pages.home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item active linkAs={Link} linkProps={{ to: "/Sports" }}>
            <FormattedMessage id="pages.sports" />
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1 className={`display-5 ${styles.page_header}`}>  <FormattedMessage id="sportsPage.title"/>  </h1>
      </Row>

      <Row lg={3} md={3} sm={2} xs={1} className="gy-3 justify-content-center">
      {SportArray.map((item, index) => (
          <Col key={index} className="d-flex justify-content-center">
            <SportCard sport={mockData} />
          </Col>
      ))}
      </Row>
    </Container>
  );
};

export default SportsPage;
