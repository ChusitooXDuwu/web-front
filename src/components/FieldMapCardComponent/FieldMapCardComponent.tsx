import React, { FC } from "react";
import styles from "./FieldMapCardComponent.module.scss";
import { Button, Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

import { FormattedMessage } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';
import { useContext } from 'react';
import FieldEntity from "../../entities/FieldEntity";

interface FieldMapCardProps {
  field: FieldEntity;
}

const FieldMapCardComponent: FC<FieldMapCardProps> = ({ field }) => {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  // Function to render rating stars
  const renderRatingStars = () => {
    const fullStars = Math.floor(field.field_rating || 0);
    const hasHalfStar = (field.field_rating || 0) % 1 >= 0.5;

    return (
      <div className="d-flex align-items-center">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className={styles.starFull}>★</span>
        ))}
        {hasHalfStar && <span className={styles.starFull}>½</span>}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <span key={i} className={styles.starEmpty}>☆</span>
        ))}
        <span className={`ms-2 ${styles.ratingText}`}>({field.field_rating || 0}/5)</span>
      </div>
    );
  };

  // Get field name from either format
  const getFieldName = () => {
    return field.name || field.fieldName || field.field_name || "Unnamed Field";
  };

  // Get city name from either format
  const getCityName = () => {
    return field.city?.name || field.cityName || "Unknown City";
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* First row for the image */}
        <Row className={styles.detailRow}>
          <Col xs={12}>
            <div className={styles.imageWrapper}>
              <Image
                src={field.image_url || field.imageUrl || "/assets/stock-bb-court.jpeg"}
                alt={getFieldName()}
                className={styles.fieldImage}
              />
              <div className={styles.ratingBadge}>
                {field.field_rating || 0} ★
              </div>
            </div>
          </Col>
        </Row>

        {/* Second row for the details */}
        <Row className={styles.detailRow}>
          <Col xs={12}>
            <h2 className={styles.fieldTitle}>{getFieldName()}</h2>
            {renderRatingStars()}
            <hr className={styles.divider} />
            <h4 className={styles.sectionTitle}><FormattedMessage id="fieldDetailCard.details" /></h4>
            <div className={styles.detailsContainer}>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📍</span>
                <span>{field.address}</span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>🏙️</span>
                <span>{getCityName()}</span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>🕒</span>
                <span><FormattedMessage id="fieldDetailCard.details.openingHours" /> {field.opening_time || "8:00 - 22:00"}</span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📞</span>
                <span><FormattedMessage id="fieldDetailCard.details.contact" /> {field.phone_number || "123-456-7890"}</span>
              </div>

              {field.sports && field.sports.length > 0 && (
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}>⚽</span>
                  <span>
                    <FormattedMessage id="fieldDetailCard.details.sports" />
                    {`: ${field.sports.map(sport => sport.name).join(", ")}`}
                  </span>
                </div>
              )}
            </div>
            <hr className={styles.divider} />
            <div className={styles.actionButtonContainer}>
              <Button
                className={styles.backButton}
                onClick={() => navigate(`/fields/${field.id}`)}
              >
                <FormattedMessage id="fieldDetailPageMap.backToField" defaultMessage="Volver al detalle del campo" />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FieldMapCardComponent;