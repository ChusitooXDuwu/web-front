// src/services/FieldsService/FieldsService.ts
import axios from "axios";
import { ResponseEntity } from "../ResponseEntity";
import baseUrl from "../Config";
import { FieldEntity } from "../../entities/Entities";

// Interface for mock data response
interface MockDataResponse {
  fields: Array<{
    id: string;
    name: string;
    city?: {
      name: string;
    };
    address: string;
    sports?: Array<any>;
    createdById?: string;
  }>;
}

// Fallback for when no backend is available - use mockData
const mockGetFieldsUrl =
  "https://gist.githubusercontent.com/Danielfts/6131ba1bdb8a625c8852844aa4d20703/raw/641af36309c81c58c24f621af99121cf3161a71a/SH-Fields.json";
const apiBaseUrl = baseUrl || "http://localhost:3000"; // Use Config.ts or default to localhost
const fieldsEndpoint = `${apiBaseUrl}/fields`;

// Interface for the field creation form data
export interface CreateFieldFormData {
  name: string;
  cityId: string;
  address: string;
  sportIds: string[];
  price?: number;
}

// Main function to get all fields with authentication
async function getFields(): Promise<{ data: FieldEntity[]; message: string }> {
  try {
    try {
      // First try with authentication
      const response = await axios.get<ResponseEntity<FieldEntity[]>>(
        fieldsEndpoint,
        { withCredentials: true }
      );

      return {
        data: response.data.data,
        message: response.data.message,
      };
    } catch (authError) {
      console.warn("Authentication failed or API unavailable, using mock data instead");

      // Fallback to mock data if authentication fails
      const mockResponse = await axios.get<ResponseEntity<MockDataResponse>>(
        mockGetFieldsUrl
      );

      // Transform the data to match expected format
      const fieldsData = mockResponse.data.data.fields.map((field: any) => {
        return {
          id: field.id,
          name: field.name,
          fieldName: field.name,
          field_name: field.name,
          cityName: field.city?.name || "",
          address: field.address,
          city: {
            id: "1",
            name: field.city?.name || "Unknown City"
          },
          sports: field.sports || [],
          createdById: field.createdById || "1",
          imageUrl: "/assets/stock-bb-court.jpeg",
          image_url: "/assets/stock-bb-court.jpeg",
          field_rating: 4.5,
          phone_number: "123-456-7890",
          opening_time: "8:00 - 22:00",
          isBooking: false,
          field_type: "field"
        };
      });

      return {
        data: fieldsData,
        message: mockResponse.data.message,
      };
    }
  } catch (error) {
    console.error("Error fetching fields:", error);
    throw error;
  }
}

// Function to create a new field
export async function createField(fieldData: CreateFieldFormData) {
  try {
    // Prepare data for the backend
    const backendData = {
      fieldName: fieldData.name,
      cityName: fieldData.cityId, // The cityId is actually the city name
      address: fieldData.address,
      price: fieldData.price || 0,
      sportIds: fieldData.sportIds
    };

    // Make the POST request with authentication
    const response = await axios.post<ResponseEntity<FieldEntity>>(
      fieldsEndpoint,
      backendData,
      {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error creating field:", error);

    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error("You must be logged in to create a field");
    } else if (error.response?.status === 403) {
      throw new Error("You don't have permission to create fields");
    } else if (error.response?.data?.message) {
      // If the message is an array, join it into a single string
      const errorMessage = Array.isArray(error.response.data.message)
        ? error.response.data.message.join(',')
        : error.response.data.message;
      throw new Error(errorMessage);
    } else {
      throw new Error("Failed to create field. Please try again later.");
    }
  }
}

// Function to get a specific field by ID
export async function getFieldById(fieldId: string) {
  try {
    const response = await axios.get<ResponseEntity<FieldEntity>>(`${fieldsEndpoint}/${fieldId}`, {
      withCredentials: true
    });

    return {
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    console.error(`Error fetching field with ID ${fieldId}:`, error);
    throw error;
  }
}

export default getFields;