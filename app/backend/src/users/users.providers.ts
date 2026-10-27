import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectType } from 'src/common/types/inject.types';

export const usersProviders = [
  {
    provide: InjectType.USERS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
    inject: [InjectType.DATA_SOURCE],
  },
];
