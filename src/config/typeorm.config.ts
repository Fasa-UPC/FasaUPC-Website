import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [join(__dirname, '..', '/entities/**/*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', '/migrations/**/*.{ts,js}')],
  migrationsRun: false,
};

const dataSource = new DataSource({
  ...dataSourceOptions,
});

export default dataSource;
