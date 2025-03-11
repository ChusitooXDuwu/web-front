import BaseEntity from "./BaseEntity";

export default interface SportEntity extends BaseEntity {
  name: string;
  available_fields: number;
  available_bookings: number
}
