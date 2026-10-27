// src/identity-server/keycloak-admin.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import KcAdminClient from 'keycloak-admin';
import { KEYCLOAK_CONFIG } from 'src/common/enviroment';
import { IdentityServerCreateUserDTO } from './dto/identity-server.dto';
import { AppException } from 'src/common/exceptions/app.exceptions';
import { ErrorCode } from 'src/common/exceptions/enums/erro-codes.enum';
import { OperationLogService } from 'src/operation-log/operation-log.service';
import { normalizeError } from 'src/common/utils/normalize';
import session from 'express-session';
import { OperationLog, OperationLogType, LogType } from 'src/operation-log/types/operation-log.types';
import { v4 } from 'uuid';

@Injectable()
export class KeycloakAdminService {
  private kcAdmin: KcAdminClient;

  constructor(
    private readonly logService: OperationLogService
  ) {
    this.kcAdmin = new KcAdminClient({
      baseUrl: KEYCLOAK_CONFIG.KEYCLOAK_SERVER_URL,
      realmName: KEYCLOAK_CONFIG.KEYCLOAK_REALM,
    });

    this.login();
  }

  async login() {
    await this.kcAdmin.auth({
      grantType: 'password',
      clientId: KEYCLOAK_CONFIG.KEYCLOAK_ADMIN_CLIENT_ID,
      username: KEYCLOAK_CONFIG.KEYCLOAK_ADMIN_USERNAME,
      password: KEYCLOAK_CONFIG.KEYCLOAK_ADMIN_PASSWORD,
    });
  }

  async createUser({
    login,
    email,
    password,
    firstName,
    lastName,
    accountId,
    tenantId,
  }: IdentityServerCreateUserDTO) {
    const logData: OperationLog = {
      operationType: OperationLogType.IAM_SERVICE_CREATE_USER,
      type: LogType.INFO,
      message: '',
      requestId: v4(),
      metadata: {
        login, 
        email, 
        firstName, 
        lastName, 
        tenantId, 
        accountId
      }
    }

    try {
      const existing = await this.kcAdmin.users.find({ username: login });
      if (existing.length > 0) {
        throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
      }

      const user = await this.kcAdmin.users.create({
        username: login,
        email,
        firstName,
        lastName,
        enabled: true,
        emailVerified: false,
        credentials: [
          {
            type: 'password',
            value: password,
            temporary: false,
          },
        ],
        attributes: {
          accountId,
          tenantId,
        },
      });

      const createdUser = await this.kcAdmin.users.findOne({
        id: user.id ?? user,
      });

      return createdUser;
    } catch (error) {
      void this.logService.log({
        ...logData,
        type: LogType.ERROR,
        message: `An error occurred while retrieving the device: ${normalizeError(error)}`,
        error,
        metadata: {
          ...logData.metadata,
        },
      })
      if (error instanceof AppException) {
        throw error;
      }

      throw new AppException(ErrorCode.IDENTITY_SERVER_CREATE_ERROR);
    }
  }

  async deleteUser(userId: string) {
    try {
      const user = await this.kcAdmin.users.del({
        id: userId,
      });

      return user;
    } catch (error) {
      throw new AppException(ErrorCode.IDENTITY_SERVER_DELETE_ERROR);
    }
  }
}
