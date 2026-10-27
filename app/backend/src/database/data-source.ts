import 'dotenv/config';
import { DataSource } from 'typeorm';
import { DATABASE } from 'src/common/enviroment';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DATABASE.DATABASE_HOST,
  port: DATABASE.DATABASE_PORT,
  username: DATABASE.DATABASE_USER,
  password: DATABASE.DATABASE_PASSWORD,
  database: DATABASE.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});
