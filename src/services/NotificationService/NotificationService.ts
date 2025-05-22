import axios from "axios";
import baseUrl from "../Config";
import { ResponseEntity } from "../ResponseEntity";
import NotificationEntity from "../../entities/NotificationEntity";

const getNotificationBaseUrl = "http://localhost:3000";
const getNotifiactionUrl = baseUrl
  ? `${baseUrl}/notifications`
  : `${getNotificationBaseUrl}/notifications`;

async function getAllNotificationUser(userId: string) {
  const getNotificationUrlAll = getNotifiactionUrl + `/user/${userId}`;
  console.log(getNotificationUrlAll);
  const response = await axios.get<ResponseEntity<Array<NotificationEntity>>>(
    getNotificationUrlAll,
    { withCredentials: true }
  );
  const data = response.data.data;
  const message = response.data.message;
  return {
    data,
    message,
  };
}

async function markAsReadOne(id: string) {
  const markAsReadOne = getNotifiactionUrl + `/read/${id}`;
  const response = await axios.patch<ResponseEntity<NotificationEntity>>(
    markAsReadOne,
    undefined,
    { withCredentials: true }
  );
  const data = response.data.data;
  const message = response.data.message;
  return {
    data,
    message,
  };
}
async function markAllUserAsRead(userId: string) {
  const markAllUserAsRead = getNotifiactionUrl + `/read/user/${userId}`;
  const response = await axios.patch<ResponseEntity<NotificationEntity>>(
    markAllUserAsRead,
    undefined,
    { withCredentials: true }
  );
  const data = response.data.data;
  const message = response.data.message;
  return {
    data,
    message,
  };
}

export { markAllUserAsRead, markAsReadOne, getAllNotificationUser };
