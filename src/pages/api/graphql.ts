import 'reflect-metadata';
import 'ts-tiny-invariant';
import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import { resolvers } from '-/prisma/generated/type-graphql';
import prisma from '@/config/prisma';
import Cors from 'micro-cors';
import { IncomingMessage, ServerResponse } from 'http';
import { buildSchema } from 'type-graphql';

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS', 'GET', 'HEAD'],
});

interface Context {
  prisma: PrismaClient;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const functionHandler = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const schema = await buildSchema({
    resolvers,
    validate: false,
  });

  const apolloServer = new ApolloServer({
    context: (): Context => ({ prisma }),
    schema,
    persistedQueries: false,
    cache: 'bounded',
    introspection: process.env.NODE_ENV !== 'production',
  });

  // Start the server asynchronously
  await apolloServer.start();

  // Return the handler function
  const handler = apolloServer.createHandler({ path: '/api/graphql' });
  return handler(req, res);
};

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await functionHandler(req, res);
});
