import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { Button, Col, Form, Row, Alert } from "react-bootstrap";
import { SportEntity, CityEntity } from "../../../entities/Entities";
import styles from "./CreateFieldFrom.module.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { createField, CreateFieldFormData } from "../../../services/FieldsService/FieldsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface CreateFieldFormProps {
  cities: CityEntity[];
  sports: SportEntity[];
}

const CreateFieldForm: FunctionComponent<CreateFieldFormProps> = ({
  cities,
  sports,
}) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Estado para el formulario
  const [formData, setFormData] = useState<CreateFieldFormData>({
    name: "",
    cityId: "",
    address: "",
    sportIds: [],
    price: 0,
  });

  // Estado para controlar errores
  const [error, setError] = useState<string | null>(null);

  // Configurar la mutación para crear un campo
  const createFieldMutation = useMutation({
    mutationFn: createField,
    onSuccess: () => {
      // Invalidar la caché para que se actualice la lista de campos
      queryClient.invalidateQueries({ queryKey: ['fields'] });
      // Redirigir a la lista de campos
      navigate('/fields');
    },
    onError: (error: any) => {
      console.error("Error creating field:", error);
      // Show the error message from the service
      setError(error.message || 'Error al crear el campo');

      // If unauthorized, redirect to login
      if (error.message === "You must be logged in to create a field") {
        navigate('/login', { state: { from: '/fields/create' } });
      }
    }
  });

  // Función para manejar los cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar los cambios en los checkboxes
  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedCheckedSports = checked
      ? [...formData.sportIds, value]
      : formData.sportIds.filter((item: string) => item !== value);
    setFormData({ ...formData, sportIds: updatedCheckedSports });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validar datos del formulario
    if (!formData.name || !formData.cityId || !formData.address) {
      setError(formatMessage({ id: "field.form.error.required" }));
      return;
    }

    if (formData.sportIds.length === 0) {
      setError(formatMessage({ id: "field.form.error.sports" }));
      return;
    }

    // Enviar datos al backend
    createFieldMutation.mutate(formData);
  };

  // Verificar si la mutación está en curso
  const isMutating = createFieldMutation.status === 'pending';

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      {isMutating && (
        <Alert variant="info" className="mb-3">
          Creando campo...
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label>
          <FormattedMessage id="field.form.label.name" />
        </Form.Label>
        <Form.Control
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={formatMessage({ id: "field.form.placeholder.name" })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FormattedMessage id="field.form.label.city" />
        </Form.Label>
        <Form.Select
          name="cityId"
          value={formData.cityId}
          onChange={handleChange}
          required
        >
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

      <Form.Group className="mb-3">
        <Form.Label>
          <FormattedMessage id="field.form.label.address" />
        </Form.Label>
        <Form.Control
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder={formatMessage({ id: "field.form.placeholder.address" })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FormattedMessage id="field.form.label.price" />{" "}
        </Form.Label>
        <Form.Control
          name="price"
          type="number"
          min={0}
          value={formData.price}
          onChange={handleChange}
          placeholder={formatMessage({ id: "field.form.placeholder.price" })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
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
                checked={formData.sportIds.includes(item.id)}
                onChange={handleCheckBoxChange}
              />
            </Col>
          ))}
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FormattedMessage id="field.form.label.photos" />
        </Form.Label>
        <Form.Control type="file" multiple />
        <Form.Text className="text-muted">
          La carga de fotos se implementará en una fase posterior.
        </Form.Text>
      </Form.Group>

      <div className="d-flex justify-content-center">
        <Button
          type="submit"
          className="mt-3"
          disabled={isMutating}
        >
          <FormattedMessage id="field.form.submit" />
        </Button>
      </div>
    </Form>
  );
};

export default CreateFieldForm;