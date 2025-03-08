import { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import styles from "./FieldCardComponent.module.scss";

interface FieldCardComponentProps {}

const FieldCardComponent: FunctionComponent<FieldCardComponentProps> = () => {
  return (
    <Card className={`bg-dark text-white ${styles.field_card}`}>
      <Card.Body className="p-0">
        <Card.Img
          src="assets/stock-bb-court.jpeg"
          alt="Card image"
          className={styles.field_card_img}
          // style={{ filter: "brightness(50%)" }}
        />
        <Card.ImgOverlay>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay>
      </Card.Body>
    </Card>
  );
};

export default FieldCardComponent;
