import BaseEntity from "./BaseEntity";
import { EventEntity } from "./Entities";
import FieldEntity from "./FieldEntity";

export default interface SportEntity extends BaseEntity {
  name: string;
  availableFields?: number;
  availableBookings?: number;
}
