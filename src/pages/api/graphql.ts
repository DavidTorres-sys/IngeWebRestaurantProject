import 'reflect-metadata';
import 'ts-tiny-invariant';
import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import { resolvers } from '-/prisma/generated/graphql/resolvers';
import { customResolvers } from '-/graphql/custom/resolvers';
import { customTypes } from '-/graphql/custom/types';
import { types } from '-/prisma/generated/graphql/types';
import prisma from '@/config/prisma';
import Cors from 'micro-cors';
import { IncomingMessage, ServerResponse } from 'http';

import { GQLEnums } from '-/prisma/generated/graphql/enums';

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
  const apolloServer = new ApolloServer({
    context: (): Context => ({ prisma }),
    typeDefs: [...types, ...customTypes, GQLEnums],
    resolvers: [...resolvers, ...customResolvers],
    persistedQueries: false,
    cache: 'bounded',
    introspection: process.env.NODE_ENV !== 'production',
  });
  const startServer = apolloServer.start();
  await startServer;
  return apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export default cors((req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  return functionHandler(req, res);
});
