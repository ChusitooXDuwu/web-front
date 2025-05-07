import UserEntity from "./UserEntity";

export interface UserProfile extends UserEntity {
  description: string;
  since: string;
  friends: string[];
  favoriteCourts: string[];
  sports: string[];
}
