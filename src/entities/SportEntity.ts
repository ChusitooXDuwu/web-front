import { BaseEntityDto } from "./BaseEntity";
import { EventEntity } from "./Entities";
import FieldEntity from "./FieldEntity";
import SportInterface from "./SportInterface";

export default class Sport implements SportInterface {
  constructor(
    public id: string,
    public createdAt: Date,
    public updatedAt: Date,
    public name: string,
    public availableFields?: number,
    public availableBookings?: number
  ) {}

  static fromApi(data: any): Sport {
    return new Sport(
      data.id,
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.name,
      data.availableFields,
      data.availableBookings
    );
  }
}

export class SportEntityDto extends BaseEntityDto implements SportInterface {
  name!: string;
  fields!: FieldEntity[];
  events!: EventEntity[];
  availableFields?: number | undefined;
  availableBookings?: number | undefined;
}
