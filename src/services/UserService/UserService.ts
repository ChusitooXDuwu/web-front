import axios from "axios";
import UserEntity from "../../entities/user/UserEntity";
import ResponseEntity from "../ResponseEntity";
import API_BASE_URL from "../Config";
import { CreateUserDto } from "../../entities/user/UserCreateEntity";

async function createUser(
  userData: CreateUserDto
): Promise<ResponseEntity<UserEntity>> {
  const url = `${API_BASE_URL}/users`;
  const response = await axios.post<
    ResponseEntity<UserEntity>,
    any,
    CreateUserDto
  >(url, userData);
  const data = response.data.data["user"];
  const message = response.data.message;
  return {
    data,
    message,
  };
}

export default createUser;
