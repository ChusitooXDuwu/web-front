import BaseEntity from "./BaseEntity";

export default interface UserEntity extends BaseEntity{
  name: string;
  email: string;
  gender: string;
  favorite_sports: string;
  phone_number: string;
  image_url: string | null;
  
}
