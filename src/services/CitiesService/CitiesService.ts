import { ResponseEntity } from "../ResponseEntity";
import baseUrl from "../Config";
import axios from "axios";
import CityEntity from "../../entities/CityEntity";

// Local mock data instead of external URL
const mockCities: CityEntity[] = [
  {
    id: "1",
    name: "Bogotá",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Medellín",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "Cali",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    name: "Barranquilla",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const apiBaseUrl = baseUrl || "http://localhost:3000";
const citiesEndpoint = `${apiBaseUrl}/cities`;

async function getCities() {
  try {
    // First try with authentication
    const response = await axios.get<ResponseEntity<CityEntity[]>>(
      citiesEndpoint,
      {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    console.warn("Error fetching cities from API, using mock data instead");

    // Return local mock data instead of making another HTTP request
    return {
      data: mockCities,
      message: "Using mock data",
    };
  }
}

export default getCities;
