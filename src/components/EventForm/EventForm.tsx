import React, { ChangeEvent, FunctionComponent, useState, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import  SportEntity from "../../entities/SportEntity";
import CityEntity from "../../entities/CityEntity";
import styles from "./EventForm.module.scss";
import { FormattedMessage, useIntl } from "react-intl";

import { LocaleContext } from '../../contexts/LocaleContext';

interface CreateFieldFormData {
  name: string;
  cityId: string;
  address: string;
  sportIds: string[];
  price: number;
}

interface CreateFieldFormProps {
  cities: CityEntity[];
  sports: SportEntity[];
}

const CreateEventForm: FunctionComponent<CreateFieldFormProps> = ({
  cities,
  sports,
}) => {
  const { formatMessage } = useIntl();
  const [formData, setFormData] = useState<CreateFieldFormData>({
    name: "",
    cityId: "",
    address: "",
    sportIds: [],
    price: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedCheckedSports = checked
      ? [...formData.sportIds, value]
      : formData.sportIds.filter((item) => item !== value);
    setFormData({ ...formData, sportIds: updatedCheckedSports });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(intl.formatMessage({ id: "event.alert" }));
  };

    const { locale } = useContext(LocaleContext);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const intl = useIntl();

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <FormattedMessage id="event.form.label.fecha" />
        </Form.Label>
        <Form.Control
          required
          name="eventDate"
          onChange={handleChange}
          type="datetime-local"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <FormattedMessage id="field.form.label.sports" />
        </Form.Label>
        <Row>
          {sports.map((item, index) => (
            <Col key={index} className={styles.check_col}>
              <Form.Check
                type="checkbox"
                label={item.name}
                value={item.id}
                onChange={handleCheckBoxChange}
              />
            </Col>
          ))}
        </Row>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <FormattedMessage id="event.form.label.cantidadJugadores" />
        </Form.Label>
        <Form.Control
          required
          name="eventDate"
          onChange={handleChange}
          type="number"
        />
      </Form.Group>
      <div className="d-flex justify-content-center">
        <Button type="submit" className="mt-3">
          <FormattedMessage id="event.form.submit"/>
        </Button>
      </div>
    </Form>
  );
};

export default CreateEventForm;
