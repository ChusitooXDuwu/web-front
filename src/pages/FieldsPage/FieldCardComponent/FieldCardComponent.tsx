import { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import styles from "./FieldCardComponent.module.scss";
import { FieldEntity } from "../../../entities/Entities";
import { useNavigate } from "react-router-dom";

interface FieldCardComponentProps {
  fieldData: FieldEntity;
}

const FieldCardComponent: FunctionComponent<FieldCardComponentProps> = ({
  fieldData,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      className={`text-white ${styles.field_card}`}
      onClick={() => navigate(`/fields/${fieldData.id}`)}
    >
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
