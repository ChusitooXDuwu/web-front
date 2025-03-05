import { Container } from "react-bootstrap";
import NavBar from "../../components/NavBarComponent";
import styles from "./HomePage.module.scss";
function HomePage() {
  return (
    <>
      <NavBar />
      <Container fluid className={styles.main_content_container}>
        <h1>Home Page</h1>
      </Container>
    </>
  );
}

export default HomePage;
