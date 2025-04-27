import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'dbnava',
  password: process.env.DB_PASS || 'NaVa',
  database: process.env.DB_NAME || 'inventory',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*.ts'],
  synchronize: false,
});
