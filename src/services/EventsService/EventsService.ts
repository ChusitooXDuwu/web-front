import OldResponseEntity, { ResponseEntity } from "../ResponseEntity";
import baseUrl from "../Config";
import axios from "axios";
import { EventEntity } from "../../entities/Entities";
import StatisticsData from "../../entities/StatisticsEntity";

const baseDefaultUrl = "http://localhost:3000/events"
const getEventsUrl = baseUrl ? `${baseUrl}/events` : baseDefaultUrl;

async function getAvailableEvents() {
  const response = await axios.get<OldResponseEntity<Array<any>>>(getEventsUrl);
  const data = response.data.data["events"];
  const processedData = data.flatMap((item) => {
    let result: EventEntity | [];
    try {
      result = EventEntity.fromApi(item);
    } catch (error) {
      result = [];
    }
    return result;
  });
  const message = response.data.message;
  return {
    data: processedData,
    message,
  };
}

async function getEventsByUserId(userId: string) {
  const url = getEventsUrl + `/users/${userId}`;
  const response = await axios.get<OldResponseEntity<Array<any>>>(url);
  const data = response.data.data["events"];
  const processedData = data.flatMap((item) => {
    let result: EventEntity | [];
    try {
      result = EventEntity.fromApi(item);
      return [result]
    } catch (error) {
      result = [];
    }
    return result;
  });
  const message = response.data.message;
  return {
    data: processedData,
    message,
  };
}

async function getStatsByUserId(userId: string) {
  const url = getEventsUrl + `/stats/${userId}`;
  const response = await axios.get<ResponseEntity<StatisticsData>>(url);
  const data = response.data.data;
  const message = response.data.message;
  return {
    data,
    message,
  };
}



export { getAvailableEvents, getEventsByUserId, getStatsByUserId };
