import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { KeycloakAdminService } from 'src/identity-server/keycloak-admin.service';
import { Repository } from 'typeorm';
import { InjectType } from 'src/common/types/inject.types';

@Injectable()
export class UsersService {
  constructor(
    @Inject(InjectType.USERS_REPOSITORY)
    private usersRepository: Repository<UserEntity>,
    private readonly keycloakAdminService: KeycloakAdminService
  ) { }
  async createUser(userData: CreateUserDto) {

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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
