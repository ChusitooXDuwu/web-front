import BookedEventEntity from "../../entities/BookedEventEntity";
import ResponseEntity from "../ResponseEntity";
import baseUrl from "../Config";
import axios from "axios";

const mockGetBookingsUrl =
  "https://gist.githubusercontent.com/Danielfts/15f50c854c3b902a4c81792583e88876/raw/371ea66f4b33502b16a524c67b440157239f3dd0/SH-BookedEvents.json";
const getBookingsUrl = baseUrl ? `${baseUrl}/bookings` : mockGetBookingsUrl;

async function getMyBookings() {
  const response = await axios.get<ResponseEntity<Array<any>>>(
    getBookingsUrl
  );
  const data = response.data.data["bookings"].map((item) => BookedEventEntity.fromApi(item));
  const message = response.data.message;
  return {
    data,
    message,
  };
}

export { getMyBookings };
