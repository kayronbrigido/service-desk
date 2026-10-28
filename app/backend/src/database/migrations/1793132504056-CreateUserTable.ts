import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";
import { baseMigrationsFields } from "./base.migration";

export class CreateUserTable1793132504056 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'accountId',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: false,
                        default: "'ACTIVE'",
                    },
                    {
                        name: 'isMainAccount',
                        type: 'boolean',
                        isNullable: false,
                        default: 'false',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'cellphone',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'login',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'profileImageUrl',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'text',
                        isNullable: false,
                    },
                    ...baseMigrationsFields,
                ],
            }),
            true,
        );

        await queryRunner.createIndex(
            'users',
            new TableIndex({ name: 'IDX_USERS_EMAIL', columnNames: ['email'] }),
        );
        await queryRunner.createIndex(
            'users',
            new TableIndex({
                name: 'IDX_USERS_LOGIN',
                columnNames: ['login'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
