import FieldDetailEntity from "../../entities/FieldDetailEntity";
import OldResponseEntity from "../ResponseEntity";
import baseUrl from "../Config";
import axios from "axios";

// URL para el Gist de GitHub con datos de campos deportivos
const mockGetFieldsUrl =
  "https://gist.githubusercontent.com/ChusitooXDuwu/cea52664a7f969892733bef07fe659b4/raw/438babbdd19ed9d83db6e480241fb81b5a776703/SH-Fields.json";
const getFieldsUrl = baseUrl ? `${baseUrl}/fields` : mockGetFieldsUrl;

// Definir la interfaz EventType para exportarla
export interface EventType {
  id: string;
  startTime: Date;
  endTime: Date;
  currentPlayers: number;
  maxPlayers: number;
  sport: {
    id: string;
    name: string;
    availableFields: number;
    availableBookings: number;
  };
  field: {
    id: string;
    name: string;
    address: string;
    city: {
      id: string;
      name: string;
    };
    sports: Array<{
      id: string;
      name: string;
      availableFields: number;
      availableBookings: number;
    }>;
    createdById: string;
  };
  image: string | null;
}

// Función para obtener detalles de un campo específico por ID
async function getFieldDetails(fieldId: string) {
  console.log("Fetching field details for ID:", fieldId);
  try {
    const response = await axios.get<OldResponseEntity<any>>(getFieldsUrl);
    console.log("API response received:", response.data);

    const fields = response.data.data["fields"];

    // Buscar el campo específico por ID
    const fieldData = fields.find((field: any) => field.id === fieldId);
    console.log("Found field data:", fieldData);

    if (!fieldData) {
      throw new Error(`Field with id ${fieldId} not found`);
    }

    try {
      const fieldEntity = FieldDetailEntity.fromApi(fieldData);
      console.log("Field entity created:", fieldEntity);
      return {
        data: fieldEntity,
        message: response.data.message,
      };
    } catch (error) {
      console.error("Error creating field entity:", error);
      throw new Error("Invalid field data");
    }
  } catch (error) {
    console.error("Error in getFieldDetails:", error);
    throw error;
  }
}

// Función para obtener todos los campos
async function getAllFields() {
  try {
    const response = await axios.get<OldResponseEntity<Array<any>>>(
      getFieldsUrl
    );
    const data = response.data.data["fields"].map((item) => {
      try {
        return FieldDetailEntity.fromApi(item);
      } catch (error) {
        console.error("Error parsing field item:", error);
        return null;
      }
    });
    const nullFilter = (
      item: FieldDetailEntity | null
    ): item is FieldDetailEntity => item != null;
    const filteredData: FieldDetailEntity[] = data.filter(nullFilter);
    const message = response.data.message;
    return {
      data: filteredData,
      message,
    };
  } catch (error) {
    console.error("Error in getAllFields:", error);
    throw error;
  }
}

// Función para obtener el precio de un campo específico
async function getFieldPrice(fieldId: string) {
  // Para nuestro mock, usaremos un mapa fijo de precios según el ID
  const prices: { [key: string]: number } = {
    "1": 150000, // 150,000 COP
    "2": 85000, // 85,000 COP
    "3": 200000, // 200,000 COP
    // Agregar más precios según sea necesario
  };

  return {
    data: prices[fieldId] || 0,
    message: "success",
  };
}

// Función para obtener eventos disponibles para un campo específico
async function getFieldEvents(fieldId: string) {
  // Para nuestro mock, crearemos algunos eventos ficticios
  const events: EventType[] = [
    {
      id: "1",
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // 2 horas después
      currentPlayers: 4,
      maxPlayers: 5,
      sport: {
        id: "1",
        name: "Baloncesto",
        availableFields: 2,
        availableBookings: 5,
      },
      field: {
        id: fieldId,
        name: "Cancha de baloncesto",
        address: "Calle 123",
        city: { id: "1", name: "Medellín" },
        sports: [
          {
            id: "1",
            name: "Baloncesto",
            availableFields: 2,
            availableBookings: 5,
          },
        ],
        createdById: "1",
      },
      image: null,
    },
    {
      id: "2",
      startTime: new Date(new Date().getTime() + 3 * 60 * 60 * 1000), // 3 horas después
      endTime: new Date(new Date().getTime() + 5 * 60 * 60 * 1000), // 5 horas después
      currentPlayers: 2,
      maxPlayers: 6,
      sport: {
        id: "2",
        name: "Fútbol",
        availableFields: 3,
        availableBookings: 7,
      },
      field: {
        id: fieldId,
        name: "Campo de fútbol",
        address: "Carrera 45",
        city: { id: "1", name: "Medellín" },
        sports: [
          { id: "2", name: "Fútbol", availableFields: 3, availableBookings: 7 },
        ],
        createdById: "1",
      },
      image: null,
    },
  ];

  return {
    data: events,
    message: "success",
  };
}

export { getFieldDetails, getAllFields, getFieldPrice, getFieldEvents };
