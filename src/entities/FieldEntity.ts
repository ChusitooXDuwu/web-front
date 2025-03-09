import BaseEntity from "./BaseEntity";
import CityEntity from "./CityEntity";
import SportEntity from "./SportEntity";

export default interface FieldEntity extends BaseEntity {
  name: string;
  city: CityEntity;
  address: string;
  sports: SportEntity[];
  createdById: string
}