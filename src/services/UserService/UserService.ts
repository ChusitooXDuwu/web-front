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
  console.log("LOG")
  console.log(API_BASE_URL)
  const url = `http://localhost:3000/users/login`;
  const response = await axios.post<
    ResponseEntity<{ token: string }>,
    AxiosResponse<ResponseEntity<{ token: string }>>,
    LoginInfo
  >(url, loginData, { withCredentials: true });
  const data = response.data.data;
  const message = response.data.message;
  return { data, message };
}

async function requestUser(id: string) {
  const url = `${API_BASE_URL}/users/${id}`;
  const response = await axios.get<ResponseEntity<UserEntity>>(url, {
    withCredentials: true,
  });
  const { data, message } = response.data;
  return { data, message };
}

async function requestMyProfile() {
  const url = `${API_BASE_URL}/users/profile`;
  const response = await axios.get<ResponseEntity<UserEntity>>(url, {
    withCredentials: true,
  });
  const { data, message } = response.data;
  return { data, message };
}

export default createUser;
export { requestLogin, requestUser, requestMyProfile };
