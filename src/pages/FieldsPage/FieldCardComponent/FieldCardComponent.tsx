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

  // Navigate to the field detail page with the actual field ID
  const handleCardClick = () => {
    navigate(`/fields/${fieldData.id}`);
  };

  // Get field name from either format
  const getFieldName = () => {
    return fieldData.name || fieldData.fieldName || "Unnamed Field";
  };

  // Get city name from either format
  const getCityName = () => {
    return fieldData.city?.name || fieldData.cityName || "Unknown City";
  };

  // Determine what sports are available
  const sportsList = fieldData.sports && fieldData.sports.length > 0
    ? fieldData.sports.map(item => item.name).join(", ")
    : "No sports specified";

  return (
    <Card
      className={`text-white ${styles.field_card}`}
      onClick={handleCardClick}
    >
      <Card.Body className={`${styles.card_body}`}>
        <Card.Title>{getFieldName()}</Card.Title>
        <Card.Text>
          <i className="bi-geo-alt-fill"></i> {getCityName()}
        </Card.Text>
        <Card.Text>
          <i className="bi-dribbble"></i> {sportsList}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FieldCardComponent;