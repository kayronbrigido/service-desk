import { Inject, Injectable, Logger } from '@nestjs/common';
import { LogType, OperationLog } from './types/operation-log.types';
import { NODE_ENV } from 'src/common/enviroment';
import { InjectType } from 'src/common/types/inject.types';
import { Repository } from 'typeorm';
import { OperationLogs } from './entities/operation-log.entity';
import { normalizeError } from 'src/common/utils/normalize';

@Injectable()
export class OperationLogService {
  constructor(
    @Inject(InjectType.OPERATION_LOGS_REPOSITORY)
    private operationLogsRepository: Repository<OperationLogs>,
  ) {}
  async log(logData: OperationLog) {
    const data = {
      ...logData,
      env: NODE_ENV,
    };

    if(data.type === LogType.ERROR || data.type === LogType.CRITICAL_ERROR) {
      Logger.error(`INFO: ${data.message} - OPERATION: ${data.operationType} - ERROR: ${normalizeError(data?.error)}`, data.operationType)
    } else {
      Logger.log(`INFO: ${data.message}`, data.operationType)
    }

    if (NODE_ENV != 'development') await this.operationLogsRepository.save({
      ...data,
      error: String(data.error)
    });
  }
}
