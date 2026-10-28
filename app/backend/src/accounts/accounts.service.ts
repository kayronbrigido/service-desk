import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Repository } from 'typeorm';
import { InjectType } from 'src/common/types/inject.types';
import { AccountEntity } from './entities/account.entity';
import { LogType, OperationLog, OperationLogType } from 'src/operation-log/types/operation-log.types';
import { v4 } from 'uuid';
import { AppException } from 'src/common/exceptions/app.exceptions';
import { normalizeError } from 'src/common/utils/normalize';
import { ErrorCode } from 'src/common/exceptions/enums/erro-codes.enum';
import { OperationLogService } from 'src/operation-log/operation-log.service';
import { SessionType } from 'src/common/types';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(InjectType.ACCOUNTS_REPOSITORY)
    private accountRepository: Repository<AccountEntity>,
    private readonly operationLogService: OperationLogService
  ) { }
  async createAccount(createAccountDto: CreateAccountDto, session?: SessionType) {
    const operationLog: OperationLog = {
      operationType: OperationLogType.CREATE_ACCOUNT_SERVICE,
      type: LogType.INFO,
      message: '',
      requestId: v4(),
      metadata: { createAccountDto }
    };
    try {
      return await this.accountRepository.save(createAccountDto)
    } catch (error) {
      void this.operationLogService.log({
        ...operationLog,
        type: LogType.ERROR,
        message: `Failed to query account, error: ${normalizeError(error)}`,
        error,
      });

      throw new AppException(ErrorCode.CREATE_ACCOUNT_ERROR);
    }
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: string, updateAccountDto: UpdateAccountDto, session?: SessionType) {
    return `This action updates a #${id} account`;
  }

  async remove(id: string, session?: SessionType) {
   const operationLog: OperationLog = {
      operationType: OperationLogType.REMOVE_ACCOUNT_SERVICE,
      type: LogType.INFO,
      message: '',
      requestId: session?.requestId || v4(),
      metadata: session
    };
    try {
      return await this.accountRepository.softDelete({ id })
    } catch (error) {
      void this.operationLogService.log({
        ...operationLog,
        type: LogType.ERROR,
        message: `Failed to remove account, error: ${normalizeError(error)}`,
        error,
      });

      throw new AppException(ErrorCode.REMOVE_ACCOUNT_ERROR);
    }
  }
}
