import BaseEntity from "./BaseEntity";

export default class BookedEventEntity implements BaseEntity {
  constructor(
    public id: string,
    public startDateTime: Date,
    public endDateTime: Date,
    public locationName: string,
    public address: string,
    public sportName: string,
    public imageUrl: string | null
  ) {}

  static fromApi(data: any): BookedEventEntity | null {
    try {
      return new BookedEventEntity(
        data.id,
        new Date(data.startDateTime),
        new Date(data.endDateTime),
        data.locationName,
        data.address,
        data.sportName,
        data.imageUrl || null
      );
    } catch (error) {
      console.log(error);
      throw new Error("Invalid api data");
      
    }
  }
}
