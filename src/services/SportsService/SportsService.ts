import OldResponseEntity, { ResponseEntity } from "../ResponseEntity";
import baseUrl from "../Config";
import axios from "axios";
import SportEntity from "../../entities/SportInterface";
const getSportsbaseUrl = "http://localhost:3000";
const getSportsUrl = baseUrl
  ? `${baseUrl}/sport`
  : `${getSportsbaseUrl}/sport`;

async function getSports() {
  const getSportsUrlCount = getSportsUrl + "/counts";
  const response = await axios.get<ResponseEntity<Array<SportEntity>>>(
    getSportsUrlCount,
    { withCredentials: true }
  );
  const data = response.data.data;
  const message = response.data.message;
  return {
    data,
    message,
  };
}

export default getSports;
