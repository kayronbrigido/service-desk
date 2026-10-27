export enum AccountType {

}
export class CreateAccountDto {
  type: AccountType;
  name: string;
  taxIdentifier: string;
  login: string;
  cellphone?: string;
  email?: string;
  password: string;
  tenantId?: string;
}