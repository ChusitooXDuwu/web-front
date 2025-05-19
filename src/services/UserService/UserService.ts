import axios, { AxiosResponse } from "axios";
import UserEntity from "../../entities/user/UserEntity";
import { ResponseEntity } from "../ResponseEntity";
import API_BASE_URL from "../Config";
import { CreateUserDto } from "../../entities/user/UserCreateEntity";
import { LoginInfo } from "../../entities/user/LoginInfo";

async function createUser(
  userData: CreateUserDto
): Promise<ResponseEntity<UserEntity>> {
  const url = `${API_BASE_URL}/users`;
  const response = await axios.post<
    ResponseEntity<UserEntity>,
    AxiosResponse<ResponseEntity<UserEntity>>,
    CreateUserDto
  >(url, userData);
  const data = response.data.data;
  const message = response.data.message;
  return {
    data,
    message,
  };
}

async function requestLogin(loginData: LoginInfo) {
  const url = `${API_BASE_URL}/users/login`;
  const response = await axios.post<
    ResponseEntity<{ token: string }>,
    AxiosResponse<ResponseEntity<{ token: string }>>,
    LoginInfo
  >(url, loginData, { withCredentials: true });
  const data = response.data.data;
  const message = response.data.message;
  return { data, message };
}

export default createUser;
export { requestLogin };
