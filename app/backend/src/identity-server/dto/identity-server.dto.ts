export class AuthLoginResponse {
  access_token?: string;
  expires_in?: number;
  refresh_expires_in?: number;
  refresh_token?: string;
}

export class IdentityServerCreateUserDTO {
  login: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accountId: string;
  tenantId?: string;
}
