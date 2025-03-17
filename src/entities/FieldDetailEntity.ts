import BaseEntity from "./BaseEntity";

export default class FieldDetailEntity implements BaseEntity {
  constructor(
    public id: string,
    public field_name: string,
    public field_rating: number,
    public phone_number: string,
    public address: string,
    public opening_time: string,
    public image_url: string,
    public isBooking: boolean,
    public field_type: string // puede ser "field", "booking" o "event"
  ) {}

  static fromApi(data: any): FieldDetailEntity | null {
    try {
      return new FieldDetailEntity(
        data.id,
        data.field_name,
        data.field_rating,
        data.phone_number,
        data.address,
        data.opening_time,
        data.image_url || "/assets/default-field.jpg", // URL de imagen por defecto si no existe
        !!data.isBooking, // Convertir a booleano si viene como cualquier otro tipo
        data.field_type || "field" // Valor por defecto "field" si no viene especificado
      );
    } catch (error) {
      console.log(error);
      throw new Error("Invalid api data");
    }
  }
}