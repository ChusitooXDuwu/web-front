import OldResponseEntity from "../ResponseEntity";
import baseUrl from "../Config";
import axios from "axios";
import SportEntity from "../../entities/SportEntity";
const mockGetSportsUrl =
  "https://gist.githubusercontent.com/Danielfts/4c1415acb5cbd3b65b7a4280cd85fdd2/raw/c732d4d44b6ca1c94f393d72c52279eb9069b025/SH-Sports.json";
const getSportsUrl = baseUrl ? `${baseUrl}/cities` : mockGetSportsUrl;

async function getSports() {
  const response = await axios.get<OldResponseEntity<Array<SportEntity>>>(
    getSportsUrl
  );
  const data = response.data.data["sports"];
  const message = response.data.message;
  return {
    data,
    message,
  };
}

export default getSports;
