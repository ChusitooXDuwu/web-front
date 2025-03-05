import { Container } from "react-bootstrap";
import styles from "./HomePage.module.scss";
function HomePage() {
  return (
    <>
      <Container fluid className={styles.main_content_container}>
        <h1>Home Page</h1>
      </Container>
    </>
  );
}

export default HomePage;
