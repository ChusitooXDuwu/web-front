import React, { FC } from "react";
import styles from "./SportCard.module.scss"; 
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import SportEntity from "../../entities/SportEntity";
import { ReactComponent as BasketballIcon } from "../../icons/basketballSVG.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';

import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';
import { useState } from 'react';


interface SportCardProps {
  sport: SportEntity;
}


const SportCard: FC<SportCardProps> = ({ sport }) => {

  const navigate = useNavigate();
  const navToFields = () => navigate(`/fields`);
  const { locale } = useContext(LocaleContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const intl = useIntl();
  const { formatMessage } = intl;
  

  return (
  
    <Card style={{ width: "18rem", backgroundColor: "#60508C" }} onClick={navToFields} className={`${styles.sport_card}`}>
      <Card.Body className={styles.card_body}>
        <div className="d-flex justify-content-center w-100">
          <BasketballIcon
            width="100"
            height="115"
            style={{ fill: "#FFFFFF" }}
          />
        </div>
        <Card.Title className="d-flex justify-content-center" style={{ color: "#FFFFFF" }}>{sport.name}</Card.Title>
        <Card.Text className={styles.description}>
          <ListGroup>
            <ListGroup.Item style={{ backgroundColor: "#60508C", color: "#FFFFFF", borderColor: "#60508C" }}>
              <Row>
                <Col className="d-flex justify-content-center">
                  <b>{sport.available_fields} <FormattedMessage id="sportCard.availableFields"/></b>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: "#60508C", color: "#FFFFFF", borderColor: "#60508C" }}>
              <Row>
                <Col className="d-flex justify-content-center">
                  <b>{sport.available_bookings} <FormattedMessage id="sportCard.availableBookings"/></b>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SportCard;