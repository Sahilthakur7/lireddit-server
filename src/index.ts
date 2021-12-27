import { createConnection } from 'typeorm';
import { dbConfig } from './config/db';
import express from 'express';

// import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';

const main = async () => {
  require('dotenv').config();
  const connection = await createConnection(dbConfig);

  const app = express();

  // const apolloServer = new ApolloServer({
  //   schema: await buildSchema({
  //     resolvers: [HelloResolver],
  //     validate: false,
  //   }),
  // });

  app.listen(4000, () => {
    console.log('started the express app');
  });
};

main();
