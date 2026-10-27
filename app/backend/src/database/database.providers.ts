import { InjectType } from 'src/common/types/inject.types';
import { AppDataSource } from './data-source';

export const databaseProviders = [
  {
    provide: InjectType.DATA_SOURCE,
    useFactory: () => AppDataSource,
  },
];
