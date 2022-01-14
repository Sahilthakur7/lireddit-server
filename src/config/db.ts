import { ConnectionOptions } from 'typeorm';
import { Post } from '../entities/Post.entity';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { User } from '../entities/User.entity';

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
  entities: [Post, User],
  synchronize: true,
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
});
