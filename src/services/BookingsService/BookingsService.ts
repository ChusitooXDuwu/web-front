import BookedEventEntity from "../../entities/BookedEventEntity";
import OldResponseEntity from "../ResponseEntity";
import baseUrl from "../Config";
import axios from "axios";

const mockGetBookingsUrl =
  "https://gist.githubusercontent.com/Danielfts/15f50c854c3b902a4c81792583e88876/raw/371ea66f4b33502b16a524c67b440157239f3dd0/SH-BookedEvents.json";
const getBookingsUrl = baseUrl ? `${baseUrl}/events` : mockGetBookingsUrl;

async function getMyBookings() {
  const response = await axios.get<OldResponseEntity<Array<any>>>(
    getBookingsUrl
  );
  const data = response.data.data["bookings"].map((item) => {
    try {
      return BookedEventEntity.fromApi(item);
    } catch (error) {
      return null;
    }
  });
  const nullFilter = (
    item: BookedEventEntity | null
  ): item is BookedEventEntity => item != null;
  const filteredData: BookedEventEntity[] = data.filter(nullFilter);
  const message = response.data.message;
  return {
    data: filteredData,
    message,
  };
}

export { getMyBookings };
