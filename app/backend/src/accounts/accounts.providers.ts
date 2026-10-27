import { DataSource } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { InjectType } from 'src/common/types/inject.types';

export const accountProviders = [
  {
    provide: InjectType.ACCOUNTS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AccountEntity),
    inject: [InjectType.DATA_SOURCE],
  },
];
