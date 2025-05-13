// src/services/FieldsService/FieldsService.ts
import axios from "axios";
import ResponseEntity from "../ResponseEntity";
import baseUrl from "../Config";
import { FieldEntity } from "../../entities/Entities";

// URL del backend real
const apiBaseUrl = baseUrl || "http://localhost:3000"; // Ajusta esto según la URL de tu API de NestJS
const fieldsEndpoint = `${apiBaseUrl}/fields`;

// Interfaz para los datos del formulario de creación
export interface CreateFieldFormData {
  name: string;
  cityId: string;
  address: string;
  sportIds: string[];
  price?: number;
}

async function getFields() {
  try {
    const response = await axios.get<FieldEntity[]>(fieldsEndpoint);
    return {
      data: response.data,
      message: "success"
    };
  } catch (error) {
    console.error("Error fetching fields:", error);
    throw error;
  }
}

// Función para crear un campo nuevo
export async function createField(fieldData: CreateFieldFormData) {
  try {
    // Preparar datos para el backend
    const backendData = {
      fieldName: fieldData.name,
      cityName: fieldData.cityId, // Asumiendo que usas cityId como cityName
      address: fieldData.address,
      // Añadir otros campos según sea necesario
    };

    // Obtener token si es necesario para la autenticación
    const token = localStorage.getItem('token');
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    // Realizar la solicitud POST
    const response = await axios.post(fieldsEndpoint, backendData, config);

    // Si hay deportes seleccionados, agregarlos al campo
    if (fieldData.sportIds && fieldData.sportIds.length > 0 && response.data.id) {
      for (const sportId of fieldData.sportIds) {
        await axios.post(
          `${fieldsEndpoint}/${response.data.id}/sports/${sportId}`,
          {},
          config
        );
      }
    }

    return response.data;
  } catch (error) {
    console.error("Error creating field:", error);
    throw error;
  }
}

export default getFields;