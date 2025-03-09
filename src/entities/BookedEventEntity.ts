import BaseEntity from "./BaseEntity";

export default interface BookedEventEntity extends BaseEntity{
  startDateTime: Date;
  endDateTime: Date;
  locationName: string;
  address: string;
  sportName: string;
  imageUrl: string | null;
}
