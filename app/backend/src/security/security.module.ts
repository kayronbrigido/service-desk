import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SecurityService } from './security.service';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.providers';

@Module({
  imports: [DatabaseModule],
  providers: [SecurityService, UsersService, ...usersProviders],
  exports: [SecurityService],
})
export class SecurityModule {}
