import React, { FC } from "react";
import styles from "./FieldMapCardComponent.module.scss";
import { Button, Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';
import { useContext } from 'react';

import FieldDetailEntity from "../../entities/FieldDetailEntity";
interface FieldDetailCardProps {
  field: FieldDetailEntity;
}



const FieldMapCardComponent: FC<FieldDetailCardProps> = ({ field }) => {
  // Function to render rating stars using plain text
  const navigate = useNavigate();
  const renderRatingStars = () => {
    // Determine button text based on isBooking property
    
    const fullStars = Math.floor(field.field_rating);
    const hasHalfStar = field.field_rating % 1 >= 0.5;
    
    return (
      <div className="d-flex align-items-center">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className={styles.starFull}>★</span>
        ))}
        {hasHalfStar && <span className={styles.starFull}>½</span>}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <span key={i} className={styles.starEmpty}>☆</span>
        ))}
        <span className={`ms-2 ${styles.ratingText}`}>({field.field_rating}/5)</span>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* First row for the image */}
        <Row className={styles.detailRow}>
          <Col xs={12}>
            <div className={styles.imageWrapper}>
              <Image
                src={field.image_url}
                alt={field.field_name}
                className={styles.fieldImage}
              />
              <div className={styles.ratingBadge}>
                {field.field_rating} ★
              </div>
            </div>
          </Col>
        </Row>

        {/* Second row for the details */}
        <Row className={styles.detailRow}>
          <Col xs={12}>
            <h2 className={styles.fieldTitle}>{field.field_name}</h2>
            {renderRatingStars()}
            <hr className={styles.divider} />
            <h4 className={styles.sectionTitle}><FormattedMessage id = "fieldDetailCard.details"/></h4>
            <div className={styles.detailsContainer}>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📍</span>
                <span>{field.address}</span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>🕒</span>
                <span><FormattedMessage id = "fieldDetailCard.details.openingHours"/> {field.opening_time}</span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📞</span>
                <span><FormattedMessage id = "fieldDetailCard.details.contact"/> {field.phone_number}</span>
              </div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.actionButtonContainer}>
              <Button className={styles.bookButton}>
                {field.field_type === "field" && <FormattedMessage id = "fieldDetailButtons.book"/>}
                {field.field_type === "booking" && <FormattedMessage id = "fieldDetailButtons.cancel"/>}
                {field.field_type === "event" && <FormattedMessage id = "fieldDetailButtons.join"/>}
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FieldMapCardComponent;