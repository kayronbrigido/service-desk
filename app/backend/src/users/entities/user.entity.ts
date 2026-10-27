// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accountId: string;

  @Column()
  status: string;

  @Column()
  isMainAccount: boolean;

  @Column()
  name: string;

  @Column()
  cellphone?: string;

  @Column()
  login: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  profileImageUrl?: string;
}
