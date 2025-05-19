import BaseEntity from "./BaseEntity";


export default interface SportInterface extends BaseEntity {
  name: string;
  availableFields?: number;
  availableBookings?: number;
}
