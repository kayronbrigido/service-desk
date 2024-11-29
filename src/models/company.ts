import { IAddress } from "./auth";

export interface ICompanyData {
  address?: IAddress
  city?: string;
  country?: string;
  neighborhood?: string;
  number?: string;
  state?: string;
  street?: string;
  zipCode?: string;
  email?: string;
  tradeName?: string;
  id?: string;
  name?: string;
  phone?: string;
  taxIdentifier?: string;
  type?: number;
  userAuthId?: string;
  userId?: string;
}