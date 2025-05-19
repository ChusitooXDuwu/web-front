import { Type } from "class-transformer";

export default interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BaseEntityDto implements BaseEntity {
  id!: string;
  @Type(() => Date)
  createdAt?: Date | undefined;
  @Type(() => Date)
  updatedAt?: Date | undefined;
}
