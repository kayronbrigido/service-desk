import { RolesEnum } from './enums';

export interface IAuthResponse {

}

export interface IUserData {
  firstName?: string,
  lastName?: string,
  login?: string,
  role?: RolesEnum,
  companyId?: string
}

export interface ILoggerUserData extends IUserData {
  id?: string
}

export interface ICreateLogin extends IUserData {
  password?: string,
}

export interface IAddress {
  street?: string,
  number?: string,
  neighborhood?: string,
  city?: string,
  state?: string,
  country?: string,
  zipCode?: string,
  additionalInformation?: string,
}

export interface ICreateUserPayload extends ICreateLogin {
  role?: RolesEnum
  companyId?: string,
}

export interface ICreateCompanyPayload extends ICreateLogin {
  taxIdentifier?: string,
  name?: string,
  tradeName?: string,
  phone?: string,
  email?: string,
  address?: IAddress,
  type?: number
  userId?: string
}

