import { createConnection } from 'typeorm';
import { Post } from './entities/Post';

const main = async () => {
  require('dotenv').config();
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Post],
  });

  const post = connection
};

main();
