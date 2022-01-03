import { ConnectionOptions, createConnection } from 'typeorm';
import { createDBConfig } from './config/db';
import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';

import * as dotenv from 'dotenv';
import { PostResolver } from './resolvers/post';

const main = async () => {
  dotenv.config();

  const app = express();

  const configOptions = createDBConfig(
    process.env.DB_USER,
    process.env.DB_PASS,
    process.env.DB_NAME
  ) as ConnectionOptions;

  const connection = await createConnection(configOptions);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ connection }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('started the express app');
  });
};

main();
