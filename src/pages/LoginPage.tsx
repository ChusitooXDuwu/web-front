import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'; 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useState } from 'react';


function Match(props: { fecha: Date, start_time: Date, end_time: Date, current_players: number, max_players: number, deporte: string, image: string}) {
  const [cupos, setCupos] = useState(props.current_players);

  const renderCupos = () => {
    if (cupos === 0) return "¡Sé el primero en inscribirte!";
    else return `Cupos: ${cupos}/${props.max_players}`; 
  };
  
  const handleCupos = () => {
    setCupos(cupos + 1);
    console.log("Inscrito");
  };

  
  return (
    <Col xs={12} md={6} lg={4} className="mb-4"> 
      <Card className="h-100 shadow-lg"> 
        <Row className="g-0 h-100" > 
          
          <Col xs={12} sm={4} className="d-flex align-items-center h-100"> 
            <Card.Img 
              src={props.image} 
              alt={props.deporte} 
              className="h-100 w-100 rounded-start" 
              style={{ 
                objectFit: "cover"
               }} 
            />
          </Col>

          
          <Col xs={12} sm={8} 
          style={{ backgroundColor: "#6a0dad", padding: "20px", borderRadius: "0 8px 8px 0" }}
          className="d-flex flex-column h-100 text-white">
            <Card.Body className="flex-grow-1 d-flex flex-column justify-content-between">
              <Card.Title className="text-warning">{props.deporte}</Card.Title>
              <Card.Text>
                <p><strong>Fecha:</strong> {props.fecha.toDateString()}</p>
                <p><strong>Hora:</strong> {props.start_time.toLocaleTimeString()} - {props.end_time.toLocaleTimeString()}</p>
                <p><strong>{renderCupos()}</strong></p>
              </Card.Text>
              <Button 
                variant="primary" 
                onClick={handleCupos} 
                disabled={cupos >= props.max_players} 
                className="w-100"
              >
                {cupos >= props.max_players ? "Partido Lleno" : "Inscribirme"}
              </Button>
            </Card.Body>
          </Col>

        </Row>
      </Card>
    </Col>
  );
 }
  

function LoginPage() {
  return (
    <Container className="mt-5">
      <Row>
      <Match 
      fecha={new Date("2025-12-06")} 
      start_time={new Date("2025-12-06T20:00:00")} 
      end_time={new Date("2025-12-06T22:00:00")} 
      current_players={4} 
      max_players={5}
      deporte = "Baloncesto"
      image = "https://github.com/David-Fuq/images/raw/main/basket_horizontal.jpg?raw=true" />
      <Match 
      fecha={new Date("2025-10-05")} 
      start_time={new Date("2025-10-05T10:00:00")} 
      end_time={new Date("2025-10-05T12:00:00")} 
      current_players={0} 
      max_players={11} 
      deporte = "Padel"
      image = "https://github.com/David-Fuq/images/raw/main/padel.jpg?raw=true"/>
    </Row>
    </Container>
  );
}

export default LoginPage;
