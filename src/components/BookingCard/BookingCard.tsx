import React, { FC, useContext } from "react";
import styles from "./BookingCard.module.scss";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import BookedEventEntity from "../../entities/BookedEventEntity";
import { Link } from "react-router-dom";
import { LocaleContext } from "../../contexts/LocaleContext";
import { FormattedMessage } from "react-intl";

interface BookingCardProps {
  bookedEvent: BookedEventEntity;
  
}

const BookingCard: FC<BookingCardProps> = ({ bookedEvent }) => {
  const { locale } = useContext(LocaleContext);
  const startWeekDay = bookedEvent.startDateTime.toLocaleDateString(locale, {
    weekday: "long",
  });
  const startMonth = bookedEvent.startDateTime.toLocaleDateString(locale, {
    month: "long",
  });
  const startDayOfMonth = bookedEvent.startDateTime.getDate();
  const startTime = bookedEvent.startDateTime.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const endTime = bookedEvent.endDateTime.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const imageUrl = bookedEvent.imageUrl || "/assets/stock-bb-court.jpeg";
  return (
    <Card className={`${styles.booking_card} px-0`}>
      <Row className={`g-0`}>
        <Col md={2}>
          <img
            src={imageUrl}
            alt="Field"
            className={`img-fluid rounded ${styles.card_img}`}
          />
        </Col>
        <Col md={10}>
          <ListGroup horizontal={"md"} className="h-100" as={"div"}>
            <ListGroup.Item
              className={`flex-fill ${styles.first_list_child} ${styles.list_group_item}`}
            >
              <p className={styles.centered_info}>
                {startWeekDay}
                <span className={styles.day_month}>{startDayOfMonth}</span>
                {startMonth}
              </p>
            </ListGroup.Item>
            <ListGroup.Item className={`flex-fill ${styles.list_group_item}`}>
              <p className={styles.centered_info}>
                <span className={styles.start_time}>{startTime}</span>
                <FormattedMessage
                  id="booking.untilTime"
                  values={{ time: endTime }}
                />
              </p>
            </ListGroup.Item>
            <ListGroup.Item className={`flex-fill ${styles.list_group_item}`}>
              <p className={styles.centered_info}>
                <FormattedMessage id="booking.place" />
                <span className={styles.location_name}>
                  {bookedEvent.locationName}
                </span>
                {bookedEvent.address}
              </p>
            </ListGroup.Item>
            <ListGroup.Item className={`flex-fill ${styles.list_group_item}`}>
              <i className={`bi-dribbble ${styles.sport_icon}`}></i>
              <p>{bookedEvent.sportName}</p>
            </ListGroup.Item>
            <ListGroup.Item
              className={`flex-fill ${styles.list_group_item} ${styles.last_list_child} ${styles.centered_info}`}
            >
              <Link to={`/bookings/${bookedEvent.id}`}>
                <i className="bi-eye"></i>{" "}
                <FormattedMessage id="booking.seeDetail" />
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Card>
  );
};

export default BookingCard;
