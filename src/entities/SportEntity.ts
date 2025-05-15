import BaseEntity from "./BaseEntity";

export default interface SportEntity extends BaseEntity {
  name: string;
  availableFields?: number;
  availableBookings?: number;
}
