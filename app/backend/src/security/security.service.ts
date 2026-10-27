import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exceptions/app.exceptions';
import { ErrorCode } from 'src/common/exceptions/enums/erro-codes.enum';
import { Metadata } from 'src/common/types/metadata.type';
import { normalizeError } from 'src/common/utils/normalize';
import { OperationLogService } from 'src/operation-log/operation-log.service';
import {
  LogType,
  OperationLog,
  OperationLogType,
} from 'src/operation-log/types/operation-log.types';
import { UsersService } from 'src/users/users.service';
import { v4 } from 'uuid';

@Injectable()
export class SecurityService {
  constructor(
    private operationLogService: OperationLogService,
    private userService: UsersService
  ) { }

  async loginValidation(login: string, metadata: Metadata) {
    const operationLog: OperationLog = {
      operationType: OperationLogType.SECURITY_SERVICE_LOGIN_VALIDATION,
      type: LogType.INFO,
      message: '',
      requestId: v4(),
      metadata,
    };
    try {
      await this.operationLogService.log({
        ...operationLog,
        message: 'Starting login security validation',
      });

      const user = await this.userService.findOneWithAccount();

    } catch (error) {
      void this.operationLogService.log({
        ...operationLog,
        type: LogType.ERROR,
        message: `Failed login security validation:  ${error}`,
        error,
        metadata: {
          ...operationLog.metadata,
        },
      });

      this.operationLogService.log({
        ...operationLog,
        type: LogType.ERROR,
        message: `Failed login security validation: ${normalizeError(error)}`,
        error,
      });

      if (error instanceof AppException) {
        throw error;
      }

      throw new AppException(ErrorCode.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
  }
}
