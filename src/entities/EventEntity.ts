import  { BaseEntityDto } from "./BaseEntity";
import FieldEntity from "./FieldEntity";
import SportEntity, { SportEntityDto } from "./SportEntity";
import EventInterface from "./EventInterface";
import { Type } from "class-transformer";
import { UserEntityDto } from "./user/UserEntity";


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
    ) { }

    static fromApi(data: any): Event {
        try {
            return new Event(
                data.id,
                new Date(data.createdAt),
                new Date(data.updatedAt),
                new Date(data.eventStartDateTime),
                new Date(data.eventEndDateTime),
                data.currentParticipants,
                data.maxParticipants,
                data.sport,
                data.field,
                data.image || null
            );
        } catch (error) {
            console.error("Error parsing event from API:", error);
            throw new Error("Invalid API Data");
        }
    }
}

export class EventEntityDto extends BaseEntityDto{

  @Type(() => Date)
  eventStartDateTime!: Date;
  
  @Type(() => Date)
  eventEndDateTime!: Date;

  maxParticipants!: number;

  currentParticipants!: number;
  
  image?: string | null;

  field?: FieldEntity;

  participants?: UserEntityDto[];

  sport?: SportEntityDto;
}