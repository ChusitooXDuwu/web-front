import BaseEntity from "./BaseEntity";
import FieldEntity from "./FieldEntity";
import SportEntity from "./SportEntity";
import EventInterface from "./EventInterface";

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