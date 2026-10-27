import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import type { Metadata } from 'src/common/types/metadata.type';
import { LogType, OperationLogType } from '../types/operation-log.types';

@Entity('operationLogs')
export class OperationLogs extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  operationType: OperationLogType;

  @Column()
  type: LogType;

  @Column()
  message: string;

  @Column({ name: 'traceId' })
  requestId: string;

  @Column()
  accountId?: string;

  @Column()
  userId?: string;

  @Column()
  username?: string;

  @Column()
  error?: string;

  @Column({ type: 'jsonb' })
  metadata?: Metadata;
}
