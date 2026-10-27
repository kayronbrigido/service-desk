export class CreateUserDto {
  id?: string;
  accountId: string;
  name: string;
  cellphone?: string;
  login: string;
  email?: string;
  password: string;
  tenantId?: string;
}