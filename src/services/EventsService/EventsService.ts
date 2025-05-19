import OldResponseEntity, { ResponseEntity } from "../ResponseEntity";
import baseUrl from "../Config";
import axios from "axios";
import { EventEntity } from "../../entities/Entities";
import StatisticsData from "../../entities/StatisticsEntity";
import Event, { EventEntityDto } from "../../entities/EventEntity";
import {plainToInstance} from "class-transformer"

const baseDefaultUrl = "http://localhost:3000/events"
const getEventsUrl = baseUrl ? `${baseUrl}/events` : baseDefaultUrl;

async function getAvailableEvents() {
  const response = await axios.get<ResponseEntity<object[]>>(getEventsUrl, { withCredentials: true });
  const { data: plainData, message } = response.data;
  const data = plainToInstance(EventEntityDto, plainData, {
      enableImplicitConversion: true,
  });
    console.log(data);
    return { data, message };

}

async function getEventsByUserId(userId: string) {
  const url = getEventsUrl + `/users/${userId}`;
  const response = await axios.get<ResponseEntity<Event[]>>(url, { withCredentials: true });
  const eventsData = response.data.data;
  const processedData = eventsData.flatMap((item) => {
    try {
      return [EventEntity.fromApi(item)];
    } catch (error) {
      console.warn("Invalid event item", error);
      return [];
    }
  });

  return {
    data: processedData,
    message: response.data.message,
  };
}

async function getStatsByUserId(userId: string) {
  const url = getEventsUrl + `/stats/${userId}`;
  const response = await axios.get<ResponseEntity<StatisticsData>>(url, { withCredentials: true });
  const data = response.data.data;
  const message = response.data.message;
  return {
    data,
    message,
  };
}



export { getAvailableEvents, getEventsByUserId, getStatsByUserId };
