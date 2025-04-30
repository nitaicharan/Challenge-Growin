import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +(process.env.DATABASE_PORT ?? 3000),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  synchronize: false,
  logging: ['error', 'warn'],
});
