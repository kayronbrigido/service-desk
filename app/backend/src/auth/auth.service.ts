import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { decode } from 'jsonwebtoken';
import { toTitleCase } from 'src/common/utils/toTitleCase';
import { AppException } from 'src/common/exceptions/app.exceptions';
import { ErrorCode } from 'src/common/exceptions/enums/erro-codes.enum';
import { OperationLogService } from 'src/operation-log/operation-log.service';
import {
  LogType,
  OperationLog,
  OperationLogType,
} from 'src/operation-log/types/operation-log.types';
import { v4 } from 'uuid';
import { SessionType } from 'src/common/types';
import { UsersService } from 'src/users/users.service';
import { KeycloakService } from 'src/identity-server/keycloak.service';
import { KeycloakAdminService } from 'src/identity-server/keycloak-admin.service';
import { IdentityServerCreateUserDTO } from 'src/identity-server/dto/identity-server.dto';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly operationLogService: OperationLogService,
    private readonly userService: UsersService,
    private readonly accountService: AccountsService,
    private readonly keyloackService: KeycloakService,
    private readonly keycloakAdminService: KeycloakAdminService
  ) { }

  async create(userData: CreateAuthDto) {
    const operationLog: OperationLog = {
      operationType: OperationLogType.AUTH_REGISTRATION,
      type: LogType.INFO,
      message: '',
      requestId: v4()
    };
    try {
      userData.name = toTitleCase(userData.name);

      if (userData.login.includes(' ')) {
        throw new AppException(ErrorCode.THE_LOGIN_FIELD_MUST_NOT_CONTAIN_SPACES);
      }


      const account = await this.accountService.createAccount(userData)

      if (!account?.id) {
        throw new AppException(ErrorCode.CREATE_ACCOUNT_ERROR);
      }
      const user = await this.userService.createUser({...userData, accountId: account.id})

      return user
    } catch (error) {
      void this.operationLogService.log({
        ...operationLog,
        type: LogType.ERROR,
        message: `An authentication error occurred: ${error}`,
        error,
        metadata: {
          ...operationLog.metadata,
        },
      });

      throw error;
    }


  }

  async login(loginData: LoginDto) {
    const requestId = v4();
    const session: SessionType = {
      requestId,
      metadata: loginData.metadata,
      deviceId: loginData.deviceId,
    };
    const operationLog: OperationLog = {
      operationType: OperationLogType.AUTH_SERVICE_LOGIN,
      type: LogType.INFO,
      message: '',
      requestId,
      metadata: session.metadata,
    };

    try {
      await this.operationLogService.log({
        ...operationLog,
        message: `Starting login authentication for ${loginData.login}`,
      });

      const res = await this.keyloackService.authenticateUser(
        loginData.login,
        loginData.password,
      );

      await this.operationLogService.log({
        ...operationLog,
        message: `Login authentication successful for user: ${loginData.login}`,
      });

      return { ...res };
    } catch (error) {
      void this.operationLogService.log({
        ...operationLog,
        type: LogType.ERROR,
        message: `An authentication error occurred: ${error}`,
        error,
        metadata: {
          ...operationLog.metadata,
        },
      });

      throw error;
    }
  }

  async refresh(dto: RefreshTokenDto) {
    try {
      const data = await this.keyloackService.refreshToken(dto.refreshToken);

      if (!data.access_token) {
        throw new UnauthorizedException('Refresh token inválido ou expirado');
      }

      const payload = decode(data.access_token) as { sub?: string } | null;
      const userId = payload?.sub;
      if (!userId) {
        return data;
      }

      const user = await this.userService.findOne({ id: userId });
      return { ...data, login: user?.login };
    } catch (error: unknown) {
      const isAxiosError =
        error && typeof error === 'object' && 'response' in error;
      if (isAxiosError && (error as { response?: { status?: number } }).response?.status === 400) {
        throw new UnauthorizedException('Refresh token inválido ou expirado');
      }
      throw error;
    }
  }

  async validateSession() { }
}
