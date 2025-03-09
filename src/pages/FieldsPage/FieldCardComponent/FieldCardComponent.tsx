import { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import styles from "./FieldCardComponent.module.scss";

interface FieldCardComponentProps {}

const FieldCardComponent: FunctionComponent<FieldCardComponentProps> = () => {
  return (
    <Card className={`text-white ${styles.field_card}`}>
      <Card.Body className={styles.card_body}>
        <Card.Title>Card title</Card.Title>
        <Card.Text>
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </Card.Text>
        <Card.Text>Last updated 3 mins ago</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FieldCardComponent;
