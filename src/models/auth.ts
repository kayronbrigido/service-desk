import { RolesEnum } from "./enums";

export interface IAuthResponse {

}

export interface ICreateUserPayload {
  login: string,
  password: string,
  role: RolesEnum
}