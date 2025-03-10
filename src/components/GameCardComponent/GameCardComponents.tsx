import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FC, useState } from "react";
import { Card } from "react-bootstrap";
import styles from "./GameCardComponent.module.scss";

interface GameCardComponentProps {
  start_time: Date;
  end_time: Date;
  current_players: number;
  max_players: number;
  sport: string;
  image: string | null;
}

const GameCardComponent: FC<GameCardComponentProps> = ({
  start_time,
  end_time,
  current_players,
  max_players,
  sport,
  image,
}) => {
  const [cupos, setCupos] = useState(current_players);

  const renderCupos = () => {
    return cupos === 0
      ? "¡Sé el primero en inscribirte!"
      : `Cupos: ${cupos}/${max_players}`;
  };

  const handleCupos = () => {
    if (cupos < max_players) {
      setCupos(cupos + 1);
      console.log("Inscrito");
    }
  };

  const defaultImgRoute = "/assets/basket_horizontal.jpg";

  return (
    <Card className={`${styles.event_card} h-100 shadow-lg`} style={{ minHeight: "300px" }}>
      <Row className="g-0 flex-column flex-sm-row h-100">
        {/* Image Section */}
        <Col xs={12} sm={4}>
          <Card.Img
            src={image || defaultImgRoute}
            alt={sport}
            className={`${styles.card_img} rounded`}
          />
        </Col>

        {/* Text Section */}
        <Col xs={12} sm={8} className={`${styles.card_content} rounded`}>
          <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
            <div>
              <Card.Title className={`${styles.card_title}`}>
                {sport}
              </Card.Title>
              {/* Fecha */}
              {/* "d-flex align-items-center mb-2" */}
              <div className={styles.icon_text}>
                <i className="bi bi-calendar-event"></i>
                <p>
                  <strong>Fecha:</strong> {start_time.toDateString()}
                </p>
              </div>

              {/* Hora */}
              <div className={styles.icon_text}>
                <i className="bi bi-alarm"></i>
                <p>
                  <strong>Hora:</strong> {start_time.toLocaleTimeString()} -{" "}
                  {end_time.toLocaleTimeString()}
                </p>
              </div>

              {/* Cupos */}
              <div className={styles.icon_text}>
                <i className="bi bi-people"></i>
                <p>
                  <strong>{renderCupos()}</strong>
                </p>
              </div>
            </div>
            <Button
              variant="light"
              onClick={handleCupos}
              disabled={cupos >= max_players}
              className="w-100 text-dark mt-2"
            >
              {cupos >= max_players ? "Partido Lleno" : "Inscribirme"}
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default GameCardComponent;
