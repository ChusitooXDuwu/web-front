import BaseEntity from "./BaseEntity";
import FieldEntity from "./FieldEntity";
import SportEntity from "./SportEntity";

export interface EventInterface extends BaseEntity {
  startTime: Date;
  endTime: Date;
  currentPlayers: number;
  maxPlayers: number;
  sport: SportEntity;
  field: FieldEntity;
  image: string | null;
}

export default class Event implements EventInterface {
  constructor(
    public id: string,
    public createdAt: Date,
    public updatedAt: Date,
    public startTime: Date,
    public endTime: Date,
    public currentPlayers: number,
    public maxPlayers: number,
    public sport: SportEntity,
    public field: FieldEntity,
    public image: string | null
  ) {}

  static fromApi(data: any): Event {
    try {
      return new Event(
        data.id,
        new Date(data.createdAt),
        new Date(data.updatedAt),
        new Date(data.startTime),
        new Date(data.endTime),
        data.currentPlayers,
        data.maxPlayers,
        data.sport,
        data.field,
        data.image || null
      );
    } catch (error) {
      console.error(error);
      throw new Error("Invaid Api Data");
    }
  }
}
