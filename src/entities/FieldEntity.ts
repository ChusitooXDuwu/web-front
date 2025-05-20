import BaseEntity from "./BaseEntity";
import CityEntity from "./CityEntity";
import SportEntity from "./SportInterface";

export default interface FieldEntity extends BaseEntity {
  cityName: string;
  fieldName: string;
  sports?: SportEntity[];
  createdById?: string
}
