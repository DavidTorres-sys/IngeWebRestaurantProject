import prisma from '@/config/prisma';

const UserCustomResolvers = {
  User: {},
  Query: {
    userCustomSecure: async (_: any, args: any) => {
      const user = await prisma.user.findFirst({
        where: {
          sessions: {
            some: {
              sessionToken: args.token,
            },
          },
        },
        select: {
          role: true,
          id: true,
        },
      });
      if (!user) {
        throw new Error('forbidden user not found');
      }
      if (user.role !== 'ADMIN') {
        throw new Error('forbidden user not admin');
      }
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    createUserCustom: async (_: any, args: any) => {
      return await prisma.user.create({
        data: args.data,
      });
    },
  },
};

export { UserCustomResolvers };