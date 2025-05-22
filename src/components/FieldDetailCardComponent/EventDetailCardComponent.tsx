import React, { FC, useState, useContext, useEffect } from "react";
import styles from "./FieldDetailCardComponent.module.scss";
import { Button, Col, Row, Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';
import { EventEntityDto } from "../../entities/EventEntity";
import { addUserToEvent } from "../../services/EventsService/EventsService";

interface FieldDetailCardProps {
  evento: EventEntityDto
  price: number
}

const EventDetailCard: FC<FieldDetailCardProps> = ({ evento, price }) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { locale } = useContext(LocaleContext);
  
  
  // Calculate if event is occupied based on participants
  const isOccupied = evento.currentParticipants >= evento.maxParticipants;
  
  // Set the occupied text based on the calculated status
  const [occupied, setOccupied] = useState(
    isOccupied 
      ? intl.formatMessage({ id: "fieldDetailCard.setOccupied.Occupied" })
      : intl.formatMessage({ id: "fieldDetailCard.setOccupied.notOccupied" })
  );
  
  // State for comment form visibility and input value
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState("");

  // Update occupied status if evento props change
  useEffect(() => {
    const newIsOccupied = evento.currentParticipants >= evento.maxParticipants;
    setOccupied(
      newIsOccupied
        ? intl.formatMessage({ id: "fieldDetailCard.setOccupied.Occupied" })
        : intl.formatMessage({ id: "fieldDetailCard.setOccupied.notOccupied" })
    );
  }, [evento.currentParticipants, evento.maxParticipants, intl]);
  
  // Function to handle joining the event
  const handleJoinEvent = () => {
    if (!isOccupied) {
      // Only allow joining if not occupied
      navigate("/events/join/" + evento.id);
    } else {
      // Could show a message that the event is full
      alert(intl.formatMessage({ id: "fieldDetailCard.eventFull" }));
    }
  };

  // Function to toggle comment form
  const handleAddCommentClick = () => {
    setShowCommentForm(!showCommentForm);
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
                src={evento.image ? evento.image : "https://trackandturf.com/wp-content/uploads/2024/07/outdoor-tennis-court-facility-in-the-evening.jpg"}
                alt={evento.field?.fieldName}
                className={styles.fieldImage}
              />
              {evento.field?.field_rating && (
                <div className={styles.ratingBadge}>{evento.field.field_rating} ★</div>
              )}
            </div>
          </Col>

          {/* Right column - Details */}
          <Col xs={12} md={7} className={styles.detailsColumn}>
            <h2 className={styles.fieldTitle}><FormattedMessage id="fieldDetailCard.event_title"/>{`${evento.field?.fieldName}`}</h2>

            <hr className={styles.divider} />

            <h4 className={styles.sectionTitle}><FormattedMessage id="fieldDetailCard.details"/></h4>

            <div className={styles.detailsContainer}>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📍</span>
                <span>{evento.field?.address}</span>
                <span className={styles.mapButtonWrapper}>
                  <Button className={styles.mapButton} onClick={() => navigate(`/fields/map/${evento.field?.id}`)}>
                    <FormattedMessage id="fieldDetailCard.details.seeInMap"/>
                  </Button>
                </span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>🏅</span>
                <span>
                  <FormattedMessage id="eventDetailPage.sport"/> 
                  {`: ${evento.sport?.name}`}
                </span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>👥</span>
                <span>
                  <FormattedMessage id="eventDetailPage.participants"/> 
                  {` ${evento.currentParticipants}/${evento.maxParticipants}`}
                </span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>✅</span>
                <span>
                  <FormattedMessage id="fieldDetailCard.details.isOcuppiedQuestion"/> {occupied}
                </span>
              </div>


            </div>

            <hr className={styles.divider} />

            <div className={styles.actionButtonContainer}>
              <Button 
                className={styles.bookButton} 
                onClick={handleJoinEvent}
                disabled={isOccupied}
              >
                <FormattedMessage id="fieldDetailButtons.join"/>
              </Button>

              {/* Button to show/hide comment form */}
              <Button
                className={styles.commentButton}
                onClick={handleAddCommentClick}
              >
                {showCommentForm ? 
                  <FormattedMessage id="cancelAndCommentsButton.cancel"/> : 
                  <FormattedMessage id="cancelAndCommentsButton.addComment"/>
                }
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

export default EventDetailCard;