import React, { FC } from "react";
import styles from "./SportCard.module.scss"; 

import { Card, Col, ListGroup, Row } from "react-bootstrap";
import SportEntity from "../../entities/SportEntity";
import { Link } from "react-router-dom";
import sportHubLogo from "../../icons/sporthublogotext.png";

import { ReactComponent as BasketballIcon } from "../../icons/basketballSVG.svg";
import { Container } from "react-bootstrap";

interface SportCardProps {
  sport: SportEntity;
}


const SportCard: FC<SportCardProps> = ({ sport }) => {
  let locale = "en-US";
  return (
    <Container className="d-flex justify-content-center">
      <Col xs={12} sm={8} md={6} lg={4}> {/* Controls width */}
        <Card className={`px-0 ${styles.card}`}>
        <BasketballIcon
            width="50"
            height="80"
            className={styles.icon}
            style={{ fill: "#E99E14" }}
          />
        </Card>
      </Col>
    </Container>
  );
};

export default SportCard;
