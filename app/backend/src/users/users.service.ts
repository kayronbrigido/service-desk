import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { KeycloakAdminService } from 'src/identity-server/keycloak-admin.service';
import { Repository } from 'typeorm';
import { InjectType } from 'src/common/types/inject.types';
import { AppException } from 'src/common/exceptions/app.exceptions';
import { ErrorCode } from 'src/common/exceptions/enums/erro-codes.enum';
import { normalizeError } from 'src/common/utils/normalize';
import { OperationLog, OperationLogType, LogType } from 'src/operation-log/types/operation-log.types';
import { v4 } from 'uuid';
import { SessionType } from 'src/common/types';
import { OperationLogService } from 'src/operation-log/operation-log.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(InjectType.USERS_REPOSITORY)
    private usersRepository: Repository<UserEntity>,
    private readonly operationLogService: OperationLogService,
    private readonly keycloakAdminService: KeycloakAdminService
  ) { }
  async createUser(userData: CreateUserDto, session?: SessionType) {

    const name = userData.name.split(' ');

    const { id } = await this.keycloakAdminService.createUser({
      login: userData.login,
      email: userData.email as string,
      password: userData.password,
      firstName: name[0],
      accountId: userData.accountId,
      lastName: name[name.length > 0 ? name.length - 1 : 0],
      tenantId: userData.tenantId,
    });

    const user = await this.usersRepository.save({ ...userData, id });

    return user;

  }

  findAll() {
    return `This action returns all users`;
  }

  findOne({ id }: { id: string }) {
    return { login: id };
  }

  findOneWithAccount() {
    return
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string, session?: SessionType) {
    const operationLog: OperationLog = {
      operationType: OperationLogType.REMOVE_ACCOUNT_SERVICE,
      type: LogType.INFO,
      message: '',
      requestId: session?.requestId || v4(),
      metadata: session
    };
    try {
      return await this.usersRepository.softDelete({ id })
    } catch (error) {
      void this.operationLogService.log({
        ...operationLog,
        type: LogType.ERROR,
        message: `Failed to remove account, error: ${normalizeError(error)}`,
        error,
      });

      throw new AppException(ErrorCode.REMOVE_ACCOUNT_ERROR);
    }
  }
}

