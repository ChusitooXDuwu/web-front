import axios from "axios";
import { ResponseEntity } from "../ResponseEntity";
import baseUrl from "../Config";
import { FieldEntity } from "../../entities/Entities";

// URL for the Gist of GitHub with sports fields data
const mockGetFieldsUrl =
  "https://gist.githubusercontent.com/Danielfts/6131ba1bdb8a625c8852844aa4d20703/raw/641af36309c81c58c24f621af99121cf3161a71a/SH-Fields.json";
const apiBaseUrl = baseUrl || "http://localhost:3000";
const fieldsEndpoint = `${apiBaseUrl}/fields`;

// Define the EventType interface to export
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

// Interface for the field creation form data
export interface CreateFieldFormData {
  name: string;
  cityId: string;
  address: string;
  sportIds: string[];
  price?: number;
}

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

// Main function to get all fields with authentication
async function getFields(): Promise<{ data: FieldEntity[]; message: string }> {
  try {
    console.log("Attempting to fetch fields from API:", fieldsEndpoint);

    try {
      // First try with authentication
      const response = await axios.get<ResponseEntity<FieldEntity[]>>(
        fieldsEndpoint,
        {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("API request successful:", response.status);
      return {
        data: response.data.data,
        message: response.data.message,
      };
    } catch (authError: any) {
      console.warn("Error fetching from API:", authError.message);
      console.warn("Status code:", authError.response?.status);
      console.warn("Error details:", authError.response?.data);

      // If we got a response but it's unauthorized, try getting the events endpoint to compare
      if (authError.response?.status === 401) {
        console.log("Trying to call events endpoint to compare behavior...");
        try {
          const eventsResponse = await axios.get(`${apiBaseUrl}/events`, {
            withCredentials: true
          });
          console.log("Events endpoint works! Status:", eventsResponse.status);
          console.log("This suggests a permission issue specific to the fields endpoint");
        } catch (eventsError: any) {
          console.log("Events endpoint also failed:", eventsError.message);
          console.log("This suggests a general authentication issue");
        }
      }

      console.log("Falling back to mock data");
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
        message: mockResponse.data.message || "Using mock data",
      };
    }
  } catch (error) {
    console.error("Error fetching fields:", error);

    // Return empty data instead of throwing to avoid breaking the UI
    return {
      data: [],
      message: "Error fetching data"
    };
  }
}

// Function to create a new field
export async function createField(fieldData: CreateFieldFormData) {
  try {
    // Prepare data for the backend
    const backendData = {
      name: fieldData.name,
      cityId: fieldData.cityId,
      address: fieldData.address,
      price: fieldData.price || 0,
    };

    console.log("Creating field with data:", backendData);

    // Make the POST request with authentication
    const response = await axios.post(fieldsEndpoint, backendData, {
      withCredentials: true
    });

    // If there are sports selected, add them to the field
    if (fieldData.sportIds && fieldData.sportIds.length > 0 && response.data.id) {
      console.log("Adding sports to field:", fieldData.sportIds);
      for (const sportId of fieldData.sportIds) {
        await axios.post(
          `${fieldsEndpoint}/${response.data.id}/sports/${sportId}`,
          {},
          { withCredentials: true }
        );
      }
    }

    return response.data;
  } catch (error: any) {
    console.error("Error creating field:", error.message);
    console.error("Status:", error.response?.status);
    console.error("Details:", error.response?.data);

    // Return a dummy success response with dummy ID for testing
    return {
      success: false,
      message: "Error creating field - using mock response",
      id: "mock-field-" + Date.now()
    };
  }
}

// Function to get a specific field by ID
export async function getFieldById(fieldId: string): Promise<{ data: FieldEntity; message: string }> {
  try {
    console.log("Fetching field details for ID:", fieldId);

    const response = await axios.get<ResponseEntity<FieldEntity>>(`${fieldsEndpoint}/${fieldId}`, {
      withCredentials: true
    });

    return {
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error(`Error fetching field with ID ${fieldId}:`, error.message);

    // Attempt to get field from mock data
    try {
      console.log("Falling back to mock data for field details");
      const mockResponse = await axios.get<ResponseEntity<MockDataResponse>>(mockGetFieldsUrl);
      const fieldData = mockResponse.data.data.fields.find((field) => field.id === fieldId);

      if (fieldData) {
        return {
          data: {
            id: fieldData.id,
            name: fieldData.name,
            fieldName: fieldData.name,
            field_name: fieldData.name,
            cityName: fieldData.city?.name || "",
            address: fieldData.address,
            city: {
              id: "1",
              name: fieldData.city?.name || "Unknown City"
            },
            sports: fieldData.sports || [],
            createdById: fieldData.createdById || "1",
            imageUrl: "/assets/stock-bb-court.jpeg",
            image_url: "/assets/stock-bb-court.jpeg",
            field_rating: 4.5,
            phone_number: "123-456-7890",
            opening_time: "8:00 - 22:00",
            isBooking: false,
            field_type: "field"
          },
          message: "Using mock data",
        };
      }
    } catch (mockError) {
      console.error("Error fetching mock data:", mockError);
    }

    // If all fails, return a default object
    return {
      data: {
        id: fieldId,
        name: "Mock Field",
        fieldName: "Mock Field",
        field_name: "Mock Field",
        cityName: "Mock City",
        address: "123 Mock Street",
        city: {
          id: "1",
          name: "Mock City"
        },
        sports: [],
        createdById: "1",
        imageUrl: "/assets/stock-bb-court.jpeg",
        image_url: "/assets/stock-bb-court.jpeg",
        field_rating: 4.0,
        phone_number: "123-456-7890",
        opening_time: "9:00 - 21:00",
        isBooking: false,
        field_type: "field"
      },
      message: "Using default mock data",
    };
  }
}

// Function to get the price of a field
export async function getFieldPrice(fieldId: string) {
  try {
    console.log("Fetching price for field ID:", fieldId);

    const response = await axios.get<ResponseEntity<number>>(`${fieldsEndpoint}/${fieldId}/price`, {
      withCredentials: true
    });

    return {
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error(`Error fetching price for field with ID ${fieldId}:`, error.message);

    // For mock data, use fixed prices by ID
    const mockPrices: { [key: string]: number } = {
      "1": 150000,
      "2": 85000,
      "3": 200000,
      "4": 120000,
    };

    return {
      data: mockPrices[fieldId] || 100000,
      message: "Using mock price data",
    };
  }
}

// Function to get events for a specific field
export async function getFieldEvents(fieldId: string) {
  try {
    console.log("Fetching events for field ID:", fieldId);

    const response = await axios.get<ResponseEntity<EventType[]>>(
      `${fieldsEndpoint}/${fieldId}/events`,
      { withCredentials: true }
    );

    return {
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error(`Error fetching events for field with ID ${fieldId}:`, error.message);

    // For mock data, create some sample events
    const mockEvents: EventType[] = [
      {
        id: "1",
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        currentPlayers: 4,
        maxPlayers: 6,
        sport: {
          id: "1",
          name: "Fútbol",
          availableFields: 2,
          availableBookings: 5,
        },
        field: {
          id: fieldId,
          name: "Campo Central",
          address: "Calle 123",
          city: { id: "1", name: "Bogotá" },
          sports: [
            { id: "1", name: "Fútbol", availableFields: 2, availableBookings: 5 },
          ],
          createdById: "1",
        },
        image: null,
      },
      {
        id: "2",
        startTime: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
        endTime: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        currentPlayers: 2,
        maxPlayers: 8,
        sport: {
          id: "2",
          name: "Baloncesto",
          availableFields: 3,
          availableBookings: 7,
        },
        field: {
          id: fieldId,
          name: "Cancha de Baloncesto",
          address: "Carrera 45",
          city: { id: "1", name: "Bogotá" },
          sports: [
            { id: "2", name: "Baloncesto", availableFields: 3, availableBookings: 7 },
          ],
          createdById: "1",
        },
        image: null,
      },
    ];

    return {
      data: mockEvents,
      message: "Using mock events data",
    };
  }
}

// Alias for backward compatibility
export const getFieldDetails = getFieldById;

export default getFields;