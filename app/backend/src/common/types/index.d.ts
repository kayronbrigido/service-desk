import 'express';
import { Metadata } from './metadata.type';

declare module 'express-serve-static-core' {
  interface Request {
    session?: SessionType;
  }
}

export type SessionType = {
  userId?: string;
  accountId?: string;
  deviceId?: string;
  login?: string;
  email?: string;
  cellphone?: string;
  requestId?: string;
  metadata?: Metadata;
};
