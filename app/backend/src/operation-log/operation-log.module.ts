import { Module } from '@nestjs/common';
import { operationLogsProviders } from './operation-log.providers';
import { OperationLogService } from './operation-log.service';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [DatabaseModule],
  providers: [OperationLogService, ...operationLogsProviders],
  exports: [],
})

export class OperationLogsModule {}
