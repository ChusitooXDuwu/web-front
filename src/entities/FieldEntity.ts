// This is a proposed update to the FieldEntity interface in /src/entities/FieldEntity.ts

import BaseEntity from "./BaseEntity";
import CityEntity from "./CityEntity";
import SportEntity from "./SportInterface";

export default interface FieldEntity extends BaseEntity {
  // New API format
  name: string;
  address: string;
  city: CityEntity;
  // Old format compatibility
  fieldName: string;
  cityName: string;
  // Common properties
  sports: SportEntity[];
  createdById: string;
  imageUrl: string;
  // Additional properties for detail view
  field_name: string;
  field_rating: number;
  phone_number: string;
  opening_time: string;
  isBooking: boolean;
  field_type: string;
  image_url: string;
}

// For other parts of the application that might need it, define the older format structure
export interface FieldDetailEntityFormat {
  id: string;
  field_name: string;
  field_rating: number;
  phone_number: string;
  address: string;
  opening_time: string;
  image_url: string;
  isBooking: boolean;
  field_type: string;
}