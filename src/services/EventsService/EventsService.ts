import ResponseEntity from "../ResponseEntity";
import baseUrl from "../Config";
import axios from "axios";
import EventEntity from "../../entities/EventEntity";

const mockGetEventsUrl =
  "https://gist.githubusercontent.com/Danielfts/a9ae422facf38bcb10e156ae2442d0d1/raw/cf7076d1e5c5802dbd0b0655b81d66031779d9d1/SH-Events.json";
const getEventsUrl = baseUrl ? `${baseUrl}/bookings` : mockGetEventsUrl;

async function getAvailableEvents() {
  const response = await axios.get<ResponseEntity<Array<any>>>(
    getEventsUrl
  );
  const data = response.data.data["events"];
  const processedData = data.flatMap((item) => {
    let result: EventEntity | [];
    try {
      result = EventEntity.fromApi(item)
    } catch (error) {
      result = []
    } 
    return result;
  })
  const message = response.data.message;
  return {
    data: processedData,
    message,
  };
}

export { getAvailableEvents };
