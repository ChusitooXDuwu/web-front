import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SportEntity, CityEntity } from "../../../entities/Entities";
import styles from "./CreateFieldFrom.module.scss";
import { FormattedMessage, useIntl } from "react-intl";

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

const CreateFieldForm: FunctionComponent<CreateFieldFormProps> = ({
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
    console.log("Form submitted:", formData);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <FormattedMessage id="field.form.label.name" />
        </Form.Label>
        <Form.Control
          name="name"
          onChange={handleChange}
          placeholder={formatMessage({ id: "field.form.placeholder.name" })}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <FormattedMessage id="field.form.label.city" />
        </Form.Label>
        <Form.Select name="cityId" onChange={handleChange} required>
          <option value={""}>
            <FormattedMessage id="field.form.choice" />
          </option>
          {cities.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <FormattedMessage id="field.form.label.address" />
        </Form.Label>
        <Form.Control
          name="address"
          onChange={handleChange}
          placeholder={formatMessage({ id: "field.form.placeholder.address" })}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <FormattedMessage id="field.form.label.price" />{" "}
        </Form.Label>
        <Form.Control
          name="price"
          type="number"
          min={0}
          onChange={handleChange}
          placeholder={formatMessage({ id: "field.form.placeholder.price" })}
          required
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
          <FormattedMessage id="field.form.label.photos" />
        </Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>
      <div className="d-flex justify-content-center">
        <Button type="submit" className="mt-3">
          <FormattedMessage id="field.form.submit"/>
        </Button>
      </div>
    </Form>
  );
};

export default CreateFieldForm;
