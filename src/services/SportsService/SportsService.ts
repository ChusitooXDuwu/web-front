import { ResponseEntity } from "../ResponseEntity";
import axios from "axios";
import { SportEntityDto } from "../../entities/SportEntity";
import { plainToInstance } from "class-transformer";
import API_BASE_URL from "../Config";

const getSportsUrl = `${API_BASE_URL}/sport`;

async function getSports() {
  const getSportsUrlCount = getSportsUrl + "/counts";
  const response = await axios.get<ResponseEntity<Array<object>>>(
    getSportsUrlCount,
    { withCredentials: true }
  );
  const { data: plainData, message } = response.data;
  const data = plainData.map((item) => plainToInstance(SportEntityDto, item));
  return {
    data,
    message,
  };
}

export default getSports;
