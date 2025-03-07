import { FunctionComponent, useState } from "react";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";

interface CreateFieldFormData {
  name: string;
  city: string;
  address: string;
  sports: string[];
  price: number;
}

interface CreateFieldFormProps {
  cities: any[];
}

const CreateFieldForm: FunctionComponent<CreateFieldFormProps> = ({
  cities,
}) => {
  const [formData, setFormData] = useState<CreateFieldFormData>({
    name: "",
    city: "",
    address: "",
    sports: [],
    price: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <Form  onSubmit={handleSubmit}>
      <Form.Group>
        <FormLabel>Nombre</FormLabel>
        <FormControl name="name" onChange={handleChange} placeholder="Ingrese el nombre del establecimiento" />
      </Form.Group>
      <Form.Group>
        <FormLabel>Ciudad</FormLabel>
        <Form.Select name="city">
          {cities.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <FormLabel>Dirección</FormLabel>
        <FormControl name="address" onChange={handleChange} placeholder="Ingrese la dirección" />
      </Form.Group>
      <Form.Group>
        <FormLabel>Precio</FormLabel>
        <FormControl name="price" onChange={handleChange} placeholder="Ingrese el precio" />
      </Form.Group>
      <Form.Group>
        <FormLabel>Deportes</FormLabel>
        <FormControl name="" onChange={handleChange} placeholder="Seleccione un deporte" />
      </Form.Group>
      <Form.Group>
        <FormLabel>Fotos del establecimiento</FormLabel>
        <FormControl onChange={handleChange} type="file" multiple />
      </Form.Group>
      <div className="d-flex justify-content-center">
        <Button type="submit" className="mt-3">
          Crear Cancha
        </Button>
      </div>
    </Form>
  );
};

export default CreateFieldForm;
