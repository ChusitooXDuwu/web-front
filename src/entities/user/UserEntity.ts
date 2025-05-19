import { Type } from "class-transformer";
import BaseEntity, { BaseEntityDto } from "../BaseEntity";

export default interface UserEntity extends BaseEntity {
  // Plain attributes
  givenName: string;
  lastName: string;
  email: string;
  gender: string;
  favoriteSports: string;
  phoneNumber: string;
  imageUrl: string | null;
  description: string;
  favoriteCourts?: string[];
  sports?: string[];
  // Relationships
  friends?: UserEntity[];
}

export class UserEntityDto extends BaseEntityDto implements UserEntity {
  givenName!: string;
  lastName!: string;
  email!: string;
  gender!: string;
  favoriteSports!: string;
  phoneNumber!: string;
  imageUrl!: string | null;
  description!: string;
  favoriteCourts?: string[] | undefined;
  sports?: string[] | undefined;
  friends?: UserEntityDto[] | undefined;
}
