import UserEntity from "./UserEntity"; 

// Definimos un nuevo tipo extendiendo UserEntity sin modificarlo
export interface UserProfile extends UserEntity {
  description: string;
  since: string;
  friends: string[];
  favoriteCourts: string[];
  sports: string[];
}