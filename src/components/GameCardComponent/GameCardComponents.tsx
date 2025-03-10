import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FC, useState } from "react";
import { Card } from "react-bootstrap";
import styles from "./GameCardComponent.module.scss";
import { EventEntity } from "../../entities/Entities";
import { useNavigate } from "react-router-dom";

interface GameCardComponentProps {
  event: EventEntity;
}

const GameCardComponent: FC<GameCardComponentProps> = ({ event }) => {
  // Hooks
  const navigate = useNavigate();
  const navToDetail = () => navigate(`/events/${event.id}`);

  const [cupos, setCupos] = useState(event.currentPlayers);

  const renderCupos = () => {
    return cupos === 0
      ? "¡Sé el primero en inscribirte!"
      : `Cupos: ${cupos}/${event.maxPlayers}`;
  };

  const handleCupos = () => {
    if (cupos < event.maxPlayers) {
      setCupos(cupos + 1);
      console.log("Inscrito");
    }
  };

  const defaultImgRoute = "/assets/basket_horizontal.jpg";

  return (
    <Card
      className={`${styles.event_card} h-100 shadow-lg`}
      style={{ minHeight: "300px" }}
    >
      <Row className="g-0 flex-column flex-sm-row h-100">
        {/* Image Section */}
        <Col xs={12} sm={4}>
          <Card.Img
            onClick={navToDetail}
            src={event.image || defaultImgRoute}
            alt={event.sport.name}
            className={`${styles.card_img} rounded`}
          />
        </Col>

        {/* Text Section */}
        <Col xs={12} sm={8} className={`${styles.card_content} rounded`}>
          {/* d-flex flex-column justify-content-between flex-grow-1 */}
          <div>
            <div className={styles.title_button}>
              <Card.Title className={`${styles.card_title}`}>
                {event.sport.name}
              </Card.Title>
              <Button
                aria-label="Ver detalles"
                size="sm"
                variant="outline-light"
                onClick={navToDetail}
              >
                <i className="bi bi-chevron-right"></i>
              </Button>
            </div>
            {/* Fecha */}
            <div className={styles.icon_text}>
              <i className="bi bi-calendar-event"></i>
              <p>
                <strong>Fecha:</strong> {event.startTime.toDateString()}
              </p>
            </div>

            {/* Hora */}
            <div className={styles.icon_text}>
              <i className="bi bi-alarm"></i>
              <p>
                <strong>Hora:</strong>{" "}
                {event.startTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {event.endTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* Cupos */}
            <div className={styles.icon_text}>
              <i className="bi bi-people"></i>
              <p>
                <strong>{renderCupos()}</strong>
              </p>
            </div>

            {/* Cancha */}
            <div className={styles.icon_text}>
              <i className="bi bi-geo-alt"></i>
              <p>
                <strong>{event.field.name}, </strong>
                <small>{event.field.address}</small>
              </p>
            </div>
          </div>
          <Button
            variant="light"
            onClick={handleCupos}
            disabled={cupos >= event.maxPlayers}
            className="w-100 text-dark mt-2"
          >
            {cupos >= event.maxPlayers ? "Partido Lleno" : "Inscribirme"}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default GameCardComponent;
