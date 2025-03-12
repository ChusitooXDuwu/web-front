import BaseEntity from "./BaseEntity";

export default interface ProfileEntity extends BaseEntity {
  name: string;
  email: string;
  password?: string;
}
