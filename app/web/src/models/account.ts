
export enum AccountType {
  SUPPORT = 1,
  COMMON = 2,
  BOTH = 3
}

export type Account = {
  id?: string;
  type?: AccountType,
  name?: string;
  taxIdentifier?: string;
  taxIdentifierCountry?: string;
  cellphone?: string;
}
