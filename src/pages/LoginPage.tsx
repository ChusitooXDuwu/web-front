import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Match from '../components/match_component';



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
          deporte="Baloncesto"
          image="https://github.com/David-Fuq/images/raw/main/basket_horizontal.jpg?raw=true" 
        />
        <Match 
          fecha={new Date("2025-10-05")} 
          start_time={new Date("2025-10-05T10:00:00")} 
          end_time={new Date("2025-10-05T12:00:00")} 
          current_players={0} 
          max_players={11} 
          deporte="Padel"
          image="https://github.com/David-Fuq/images/raw/main/padel.jpg?raw=true"
        />
      </Row>
    </Container>
  );
}

export default LoginPage;
