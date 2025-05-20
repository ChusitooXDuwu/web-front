import BaseEntity, { BaseEntityDto } from "../BaseEntity";
import { SportEntityDto } from "../SportEntity";
import { UserFieldInterface } from "./UserFieldEntity";

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
  favoriteFields?: UserFieldInterface[];
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
  favoriteFields?: UserFieldInterface[] | undefined;
  sports?: string[] | undefined;
  friends?: UserEntityDto[] | undefined;
}
