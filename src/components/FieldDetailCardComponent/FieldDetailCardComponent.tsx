import React, { FC, useState, useContext } from "react";
import styles from "./FieldDetailCardComponent.module.scss";
import { Button, Col, Row, Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

import FieldDetailEntity from "../../entities/FieldDetailEntity";

import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';

interface FieldDetailCardProps {
  field: FieldDetailEntity;
  price: Number;
}

const FieldDetailCard: FC<FieldDetailCardProps> = ({ field, price }) => {
  const navigate = useNavigate();

  const { locale } = useContext(LocaleContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const intl = useIntl();
  const { formatMessage } = intl;

  // State for comment form visibility and input value
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState("");
  
  const [occupied, setOccupied] = useState(intl.formatMessage({ id: "fieldDetailCard.setOccupied.notOccupied" })); 

  // Function to toggle comment form
  const handleAddCommentClick = () => {
    setShowCommentForm(!showCommentForm);
  };

  const handleOccupied = () => {
    setOccupied(intl.formatMessage({ id: "fieldDetailCard.setOccupied.Occupied" }));
    navigate("/events/create");
  };

  // Function to handle comment submission
  const handleSubmitComment = () => {
    console.log("Submitted comment:", comment);
    alert(intl.formatMessage({id: "fieldDetailCard.commentForm.writeComment"}));
    setComment(""); // Clear input after submission
    setShowCommentForm(false); // Hide form after submission
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <Row className={styles.detailRow}>
          {/* Left column - Image */}
          <Col xs={12} md={5} className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <Image
                src={field.image_url}
                alt={field.field_name}
                className={styles.fieldImage}
              />
              <div className={styles.ratingBadge}>{field.field_rating} ★</div>
            </div>
          </Col>

          {/* Right column - Details */}
          <Col xs={12} md={7} className={styles.detailsColumn}>
            <h2 className={styles.fieldTitle}>{field.field_name}</h2>

            <hr className={styles.divider} />

            <h4 className={styles.sectionTitle}><FormattedMessage id="fieldDetailCard.details"/></h4>

            <div className={styles.detailsContainer}>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📍</span>
                <span>{field.address}</span>
                <span className={styles.mapButtonWrapper}>
                  <Button className={styles.mapButton} onClick={() => navigate(`/fields/map/${field.id}`)}>
                    <FormattedMessage id="fieldDetailCard.details.seeInMap"/>
                  </Button>
                </span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>🕒</span>
                <span><FormattedMessage id="fieldDetailCard.details.openingHours"/> {field.opening_time}</span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📞</span>
                <span>
                  <FormattedMessage id="fieldDetailCard.details.contact"/> {field.phone_number}</span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>✅</span>
                <span><FormattedMessage id="fieldDetailCard.details.isOcuppiedQuestion"/> {occupied}</span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>💸</span>
                <span><FormattedMessage id="fieldDetailCard.details.price"/> {` ${price}`}</span>
              </div>
            </div>

            <hr className={styles.divider} />

            <div className={styles.actionButtonContainer}>
              <Button className={styles.bookButton} onClick={handleOccupied}>
                {field.field_type === "field" && <FormattedMessage id="fieldDetailButtons.book"/>}
                {field.field_type === "booking" && <FormattedMessage id="fieldDetailButtons.cancel"/>}
                {field.field_type === "event" && <FormattedMessage id="fieldDetailButtons.join"/>}
              </Button>

              {/* Button to show/hide comment form */}
              <Button
                className={styles.commentButton}
                onClick={handleAddCommentClick}
              >
                {showCommentForm ? <FormattedMessage id="cancelAndCommentsButton.cancel"/> : <FormattedMessage id="cancelAndCommentsButton.addComment"/>}
              </Button>
            </div>

            {/* Comment Form (Shown when 'Añadir comentarios' is clicked) */}
            {showCommentForm && (
              <div className={styles.commentForm}>
                <Form.Group controlId="commentText">
                  <Form.Label><FormattedMessage id="fieldDetailCard.commentForm.writeComment"/></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
                <Button
                  className={styles.submitCommentButton}
                  onClick={handleSubmitComment}
                >
                  <FormattedMessage id="fieldDetailCard.commentForm.sendComment"/>
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FieldDetailCard;