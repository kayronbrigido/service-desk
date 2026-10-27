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

@Injectable()
export class AccountsService {
  constructor(
    @Inject(InjectType.ACCOUNTS_REPOSITORY)
    private accountRepository: Repository<AccountEntity>,
    private readonly operationLogService: OperationLogService
  ) { }
  async createAccount(createAccountDto: CreateAccountDto) {
    const operationLog: OperationLog = {
      operationType: OperationLogType.AUTH_REGISTRATION,
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

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
