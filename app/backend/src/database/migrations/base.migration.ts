export const baseMigrationsFields = [
  {
    name: 'tenantId',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'created_at',
    type: 'timestamp',
    default: 'now()',
  },
  {
    name: 'created_by',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'updated_at',
    type: 'timestamp',
    isNullable: true,
  },
  {
    name: 'updated_by',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'deleted_at',
    type: 'timestamp',
    isNullable: true,
  },
  {
    name: 'deleted_by',
    type: 'varchar',
    isNullable: true,
  },
];
