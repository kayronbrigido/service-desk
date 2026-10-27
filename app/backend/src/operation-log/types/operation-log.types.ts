import { Metadata } from 'src/common/types/metadata.type';

export type OperationLog = {
  operationType: OperationLogType;
  type: LogType;
  message: string;
  requestId: string;
  accountId?: string;
  userId?: string;
  username?: string;
  error?: Error | unknown;
  metadata?: Metadata;
};

export enum LogType {
  WARN = 'warn',
  INFO = 'info',
  ERROR = 'error',
  CRITICAL_ERROR = 'critical_error'
}

export enum OperationLogType {
  IAM_SERVICE_CREATE_USER = 'IAM_SERVICE_CREATE_USER',
  AUTH_SERVICE_LOGIN = 'AUTH_SERVICE_LOGIN',
  AUTH_REGISTRATION = 'AUTH_REGISTRATION',
  CREATE_ACCOUNT_SERVICE = 'CREATE_ACCOUNT_SERVICE',
  REMOVE_ACCOUNT_SERVICE = 'REMOVE_ACCOUNT_SERVICE',
  ACCOUNT_FIND_ONE_BY_USER_ID = 'ACCOUNT_FIND_ONE_BY_USER_ID',
  ROLLBACK_ACCOUNT_SERVICE = 'ROLLBACK_ACCOUNT_SERVICE',
  CREATE_USER_SERVICE = 'CREATE_USER_SERVICE',
  SECURITY_SERVICE_LOGIN_VALIDATION = 'SECURITY_SERVICE_LOGIN_VALIDATION'
}
