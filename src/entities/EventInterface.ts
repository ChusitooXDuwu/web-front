import BaseEntity from "./BaseEntity";
import FieldEntity from "./FieldEntity";
import SportEntity from "./SportEntity";

export default interface EventInterface extends BaseEntity {
  startTime: Date;
  endTime: Date;
  currentPlayers: number;
  maxPlayers: number;
  sport: SportEntity;
  field: FieldEntity;
  image: string | null;
}
