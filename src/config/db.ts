import { ConnectionOptions } from 'typeorm';
import { Post } from '../entities/Post';
import * as dotenv from 'dotenv';
import { join } from 'path';

export const createDBConfig = (
  username: any,
  password: any,
  database: any
) => ({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username,
  password,
  database,
  logging: false,
  migrations: [join(__dirname, '**', '*.migration.{ts,js}')],
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: true,
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
});
