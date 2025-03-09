import { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import styles from "./FieldCardComponent.module.scss";
import { FieldEntity } from "../../../entities/Entities";

interface FieldCardComponentProps {
  fieldData: FieldEntity;
}

const FieldCardComponent: FunctionComponent<FieldCardComponentProps> = ({
  fieldData,
}) => {
  return (
    <Card className={`text-white ${styles.field_card}`}>
      <Card.Body className={`${styles.card_body}`}>
        <Card.Title>{fieldData.name}</Card.Title>
        <Card.Text>
          <i className="bi-geo-alt-fill"></i> {fieldData.address}
        </Card.Text>
        <Card.Text>
          <i className="bi-dribbble"></i>{" "}
          {fieldData.sports.map((item) => item.name).join(", ")}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FieldCardComponent;
