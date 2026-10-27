import { DataSource } from 'typeorm';
import { OperationLogs } from './entities/operation-log.entity';
import { InjectType } from 'src/common/types/inject.types';

export const operationLogsProviders = [
  {
    provide: InjectType.OPERATION_LOGS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OperationLogs),
    inject: [InjectType.DATA_SOURCE],
  },
];
