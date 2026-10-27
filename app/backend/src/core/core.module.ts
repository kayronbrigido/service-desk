import { Global, Module } from '@nestjs/common';
import { accountProviders } from 'src/accounts/accounts.providers';
import { AccountsService } from 'src/accounts/accounts.service';
import { AppService } from 'src/app.service';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { KeycloakAdminService } from 'src/identity-server/keycloak-admin.service';
import { KeycloakService } from 'src/identity-server/keycloak.service';
import { operationLogsProviders } from 'src/operation-log/operation-log.providers';
import { OperationLogService } from 'src/operation-log/operation-log.service';
import { SecurityService } from 'src/security/security.service';
import { usersProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';


@Global()
@Module({
  imports: [DatabaseModule],
  providers: [
    SecurityService,
    AppService,
    AuthService,
    AccountsService,
    ...accountProviders,
    UsersService,
    ...usersProviders,
    OperationLogService,
    ...operationLogsProviders,
    KeycloakAdminService,
    KeycloakService
  ],
  exports: [
    SecurityService,
    AppService,
    AuthService,
    AccountsService,
    ...accountProviders,
    UsersService,
    ...usersProviders,
    OperationLogService,
    ...operationLogsProviders,
    KeycloakAdminService,
    KeycloakService
  ],
})
export class CoreModule { }
