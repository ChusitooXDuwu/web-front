import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FC, useState } from "react";
import { Card } from "react-bootstrap";
// import styles from "./GameCardComponent.module.scss";

interface GameCardComponentProps {
  fecha: Date;
  start_time: Date;
  end_time: Date;
  current_players: number;
  max_players: number;
  deporte: string;
  image: string;
}

const GameCardComponent: FC<GameCardComponentProps> = ({
  fecha,
  start_time,
  end_time,
  current_players,
  max_players,
  deporte,
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

  return (
    <Card className="h-100 shadow-lg" style={{ minHeight: "300px" }}>
      <Row className="g-0 flex-column flex-sm-row h-100">
        {/* Image Section */}
        <Col xs={12} sm={4} className="p-0">
          <Card.Img
            src={image}
            alt={deporte}
            className="w-100 rounded-top rounded-sm-start"
            style={{
              objectFit: "cover",
              height: "100%", // Fill the entire height in desktop view
            }}
          />
        </Col>

        {/* Text Section */}
        <Col
          xs={12}
          sm={8}
          className="d-flex flex-column text-white"
          style={{
            backgroundColor: "#60508c",
            padding: "15px",
            borderRadius: "0 0 8px 8px",
            borderTopRightRadius: "0",
            borderBottomLeftRadius: "0px",
          }}
        >
          <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
            <div>
              <Card.Title className="text-warning fs-5">{deporte}</Card.Title>
              <Card.Text className="fs-6">
                {/* Fecha */}
                <div className="d-flex align-items-center mb-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/747/747310.png"
                    alt="Fecha"
                    width="16"
                    height="16"
                    className="me-2"
                  />
                  <p className="mb-0">
                    <strong>Fecha:</strong> {fecha.toDateString()}
                  </p>
                </div>

                {/* Hora */}
                <div className="d-flex align-items-center mb-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/109/109613.png"
                    alt="Hora"
                    width="16"
                    height="16"
                    className="me-2"
                  />
                  <p className="mb-0">
                    <strong>Hora:</strong> {start_time.toLocaleTimeString()} -{" "}
                    {end_time.toLocaleTimeString()}
                  </p>
                </div>

                {/* Cupos */}
                <div className="d-flex align-items-center mb-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/5580/5580956.png"
                    alt="Cupos"
                    width="20"
                    height="20"
                    className="me-2"
                  />
                  <p className="mb-0">
                    <strong>{renderCupos()}</strong>
                  </p>
                </div>
              </Card.Text>
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
