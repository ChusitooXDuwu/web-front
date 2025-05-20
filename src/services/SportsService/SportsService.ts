import { ResponseEntity } from "../ResponseEntity";
import axios from "axios";
import { SportEntityDto } from "../../entities/SportEntity";
import { plainToInstance } from "class-transformer";
import API_BASE_URL from "../Config";

const apiBaseUrl = API_BASE_URL || "http://localhost:3000";
const sportsEndpoint = `${apiBaseUrl}/sport/counts`;

// Mock data for fallback
const mockSports = [
  {
    id: 1,
    name: "Fútbol",
    availableFields: 5,
    availableBookings: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Baloncesto",
    availableFields: 3,
    availableBookings: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Tenis",
    availableFields: 2,
    availableBookings: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

async function getSports() {
  try {
    const response = await axios.get<ResponseEntity<Array<object>>>(
      sportsEndpoint,
      {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    const { data: plainData, message } = response.data;
    const data = plainData.map((item) => plainToInstance(SportEntityDto, item));
    return {
      data,
      message,
    };
  } catch (error) {
    console.warn("Error fetching sports from API, using mock data instead");

    // Return mock data
    return {
      data: mockSports.map(sport => plainToInstance(SportEntityDto, sport)),
      message: "Using mock data"
    };
  }
}

export default getSports;
