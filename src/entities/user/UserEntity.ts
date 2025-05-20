import { Type } from "class-transformer";
import BaseEntity, { BaseEntityDto } from "../BaseEntity";
import { SportEntityDto } from "../SportEntity";

export default interface UserEntity extends BaseEntity {
  // Plain attributes
  givenName: string;
  lastName: string;
  email: string;
  gender: string;
  favoriteSports: SportEntityDto[];
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
  favoriteSports!: SportEntityDto[];
  phoneNumber!: string;
  imageUrl!: string | null;
  description!: string;
  favoriteCourts?: string[] | undefined;
  sports?: string[] | undefined;
  friends?: UserEntityDto[] | undefined;
}
