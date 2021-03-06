import { ConnectionOptions } from 'typeorm';
import { Post } from '../entities/Post.entity';
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
  entities: [Post],
  synchronize: true,
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
});
