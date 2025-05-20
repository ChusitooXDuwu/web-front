import BaseEntity, { BaseEntityDto } from "./BaseEntity";
import { EventEntity } from "./Entities";
import FieldEntity from "./FieldEntity";

export default interface SportEntity extends BaseEntity {
  name: string;
  availableFields?: number;
  availableBookings?: number;
}

export class SportEntityDto extends BaseEntityDto implements SportEntity {
  name!: string;
  fields!: FieldEntity[];
  events!: EventEntity[];
  availableFields?: number | undefined;
  availableBookings?: number | undefined;
}
