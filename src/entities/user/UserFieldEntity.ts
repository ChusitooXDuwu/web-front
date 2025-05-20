import BaseEntity from "../BaseEntity";
import Sport from "../SportEntity";
import UserEntity from "./UserEntity";

export interface UserFieldInterface extends BaseEntity {
  cityName: string;
  fieldName: string;
  address: string;
  createdById: string | null;

  // Relations
  createdBy?: UserEntity | null;
  sports?: Sport[];
  events?: Event[];
}
