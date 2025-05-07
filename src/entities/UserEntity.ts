import BaseEntity from "./BaseEntity";

export default interface UserEntity extends BaseEntity {
  name: string;
  email: string;
  gender: string;
  favoriteSports: string;
  phoneNumber: string;
  imageUrl: string | null;
}
