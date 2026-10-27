import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";
import { baseMigrationsFields } from "./base.migration";

export class CreateAccountTable1793132494710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            default: 1,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'taxIdentifier',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cellphone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'text',
            isNullable: true,
          },
          ...baseMigrationsFields,
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'accounts',
      new TableIndex({ name: 'IDX_ACCOUNTS_EMAIL', columnNames: ['email'] }),
    );
    await queryRunner.createIndex(
      'accounts',
      new TableIndex({
        name: 'IDX_ACCOUNTS_TAX_IDENTIFIER',
        columnNames: ['taxIdentifier'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accounts');
  }

}
