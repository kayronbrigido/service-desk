import { RolesEnum } from './enums';

import { AccountType } from "./account";

export interface CreateAuthDto {
  type: AccountType;
  name: string;
  taxIdentifier: string;
  taxIdentifierCountry: string;
  login: string;
  email: string;
  password: string;
  representative?: {
    name: string;
    taxIdentifier: string;
    taxIdentifierCountry: string;
    email: string;
    cellphone: string;
  } | null;
}

export interface AuthPayload {
  login: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  access_token?: string;
  expires_in?: number,
  refresh_expires_in?: number,
  refresh_token?: string,
  user: { id: string; name: string; email: string };
  expired?: boolean
}

export interface IUserData {
  firstName?: string,
  lastName?: string,
  login?: string,
  role?: RolesEnum,
  companyId?: string
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

