import { RolesEnum } from "./enums";

export interface IAuthResponse {

}

export interface ICreateUserPayload {
  login?: string,
  password?: string,
  firstName?: '',
  lastName?: '',
  role?: RolesEnum
}