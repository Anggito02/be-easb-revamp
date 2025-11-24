import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  // dev-style; only used when no DB_URL
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),

  // production-style
  url: process.env.DB_URL,

  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: ['src/infrastructure/**/orm/*.orm_entity.ts'],
  migrations: ['src/migrations/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  logging: ['error', 'warn'],
});