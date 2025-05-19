import axios, { AxiosResponse } from "axios";
import UserEntity, { UserEntityDto } from "../../entities/user/UserEntity";
import { ResponseEntity } from "../ResponseEntity";
import API_BASE_URL from "../Config";
import { CreateUserDto } from "../../entities/user/UserCreateEntity";
import { LoginInfo } from "../../entities/user/LoginInfo";
import { plainToInstance } from "class-transformer";

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
  const response = await axios.get<ResponseEntity<object>>(url, {
    withCredentials: true,
  });
  const { data: plainData, message } = response.data;
  const data = plainToInstance(UserEntityDto, plainData, {
    enableImplicitConversion: true,
  });
  console.log(data);
  return { data, message };
}

async function requestAllUsers(params: { name: string }) {
  const url = `${API_BASE_URL}/users`;
  const response = await axios.get<ResponseEntity<object[]>>(url, {
    params,
    withCredentials: true,
  });
  const { data: plainData, message } = response.data;
  if (!Array.isArray(plainData)) throw new TypeError("Invalid response");
  const users = plainData.map((item) => plainToInstance(UserEntityDto, item));
  return { data: users, message };
}

export default createUser;
export { requestLogin, requestUser, requestMyProfile, requestAllUsers };
