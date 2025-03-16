import ResponseEntity from "../ResponseEntity";
import baseUrl from "../Config";
import axios from "axios";
import CityEntity from "../../entities/CityEntity";

const mockGetCitiesUrl =
  "https://gist.githubusercontent.com/Danielfts/6131ba1bdb8a625c8852844aa4d20703/raw/641af36309c81c58c24f621af99121cf3161a71a/SH-Cities.json";
const getCitiesUrl = baseUrl ? `${baseUrl}/cities` : mockGetCitiesUrl;

async function getCities() {
  const response = await axios.get<ResponseEntity<Array<CityEntity>>>(
    getCitiesUrl
  );
  const data = response.data.data["cities"];
  const message = response.data.message;
  return {
    data,
    message,
  };
}

export default getCities;
