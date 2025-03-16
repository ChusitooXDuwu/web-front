export default interface FieldDetailEntity {
  id: string;
  field_name: string;
  field_rating: number;
  phone_number: string;
  address: string;
  opening_time: string;
  image_url: string;
  isBooking: boolean;
  field_type: string; //puede ser "field", "booking" o "event"

}
