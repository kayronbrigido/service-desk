import { RolesEnum } from './enums';

export interface IAuthResponse {

}

export interface ICreateLogin {
  login?: string,
  password?: string,
  firstName?: string,
  lastName?: string,
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
}

export interface ICreateCompanyPayload extends ICreateLogin, IAddress {
  taxIdentifier?: string,
  name?: string,
  fantasyName?: string,
  phone?: string,
  email?: string,
  companyType?: string,
}

