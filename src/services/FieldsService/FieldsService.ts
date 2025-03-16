import ResponseEntity from "../ResponseEntity";
import baseUrl from "../Config";
import axios from "axios";
import FieldEntity from "../../entities/FieldEntity";

const mockGetFieldsUrl =
  "https://gist.githubusercontent.com/Danielfts/c6452123ca711255e748f4abd6a0f08c/raw/8e85ccb7d636679108f599d319b159c5a3056176/SH-Fields.json";
const getFieldsUrl = baseUrl ? `${baseUrl}/cities` : mockGetFieldsUrl;

async function getFields() {
  const response = await axios.get<ResponseEntity<Array<FieldEntity>>>(
    getFieldsUrl
  );
  const data = response.data.data["fields"];
  const message = response.data.message;
  return {
    data,
    message,
  };
}

export default getFields;
