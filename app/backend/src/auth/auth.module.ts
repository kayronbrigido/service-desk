import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { KeycloakAdminService } from 'src/identity-server/keycloak-admin.service';
import { usersProviders } from 'src/users/users.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AccountsService } from 'src/accounts/accounts.service';
import { KeycloakService } from 'src/identity-server/keycloak.service';
import { SecurityService } from 'src/security/security.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccountsService,
    UsersService,
    KeycloakAdminService,
    KeycloakService,
    SecurityService,
  ],
})
export class AuthModule {}
