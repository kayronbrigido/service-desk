// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { AccountType } from '../dto/create-account.dto';

@Entity('accounts')
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column()
  type?: AccountType;
  @Column()
  name?: string;
  @Column()
  taxIdentifier?: string;
  @Column()
  cellphone?: string;
  @Column()
  email?: string;
}
