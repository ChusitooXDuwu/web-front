import BaseEntity from "./BaseEntity";

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
  since: string;
  favoriteCourts: string[];
  sports: string[];
  // Relationships
  friends: UserEntity[];
}
