import { FunctionComponent } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import styles from "./FieldCardComponent.module.scss";
import { FieldEntity } from "../../../entities/Entities";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../contexts/ProfileContext";
import { useMutation } from "@tanstack/react-query";
import { requestAddField } from "../../../services/UserService/UserService";

interface FieldCardComponentProps {
  fieldData: FieldEntity;
}

const FieldCardComponent: FunctionComponent<FieldCardComponentProps> = ({
  fieldData,
}) => {
  const navigate = useNavigate();
  const { profile, refetch: refetchProfile } = useProfile();
  const favouriteFields = profile?.favoriteFields || [];
  const favouriteFieldIds = favouriteFields.map((item) => item.id);
  const filledHeartClass = "bi-heart-fill";
  const outlineHeartClass = "bi-heart";

  const addFieldMutation = useMutation({
    mutationFn: (params: { userId: string; fieldId: string }) =>
      requestAddField(params.userId, params.fieldId),
    onSuccess: () => {
      refetchProfile();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // Navigate to the field detail page with the actual field ID
  const handleCardClick = () => {
    navigate(`/fields/${fieldData.id}`);
  };

  const handleFavButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (profile) {
      addFieldMutation.mutate({ userId: profile?.id, fieldId: fieldData.id });
    }
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
  const sportsList =
    fieldData.sports && fieldData.sports.length > 0
      ? fieldData.sports.map((item) => item.name).join(", ")
      : "No sports specified";

  return (
    <Card
      className={`text-white ${styles.field_card}`}
      onClick={handleCardClick}
    >
      <Card.Body className={`${styles.card_body}`}>
        <Card.Title>{getFieldName()}</Card.Title>
        <Row>
          <Col xs="10">
            <Card.Text>
              <i className="bi-geo-alt-fill"></i> {getCityName()}
            </Card.Text>
            <Card.Text>
              <i className="bi-dribbble"></i> {sportsList}
            </Card.Text>
          </Col>
          <Col
            xs="2"
            className="ps-0 pe-2 d-flex justify-content-end align-items-end"
          >
            <Button onClick={handleFavButtonClick}>
              <i
                className={[
                  "bi",
                  favouriteFieldIds.includes(fieldData.id)
                    ? filledHeartClass
                    : outlineHeartClass,
                ].join(" ")}
              ></i>
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FieldCardComponent;
