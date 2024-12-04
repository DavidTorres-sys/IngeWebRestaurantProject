import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/config/prisma";

const options: NextAuthOptions = {
  callbacks: {
    async session({ session, user }: any) {
      const newSession = (await prisma.session.findFirst({
        where: {
          userId: user.id,
        },
        include: {
          user: true,
        },
        orderBy: {
          expires: "desc",
        },
      })) as any;
      return {
        ...session,
        user: newSession?.user,
        token: newSession?.sessionToken,
      };
    },
  },
  providers: [
    Auth0Provider({
      wellKnown: `https://${process.env.AUTH0_DOMAIN_AUTH}/`,
      issuer: process.env.AUTH0_DOMAIN_AUTH,
      authorization: `https://${process.env.AUTH0_DOMAIN_AUTH}/authorize?response_type=code&prompt=login`,
      clientId: `${process.env.AUTH0_CLIENT_ID_AUTH}`,
      clientSecret: `${process.env.AUTH0_CLIENT_SECRET_AUTH}`,
    }),
  ],
  secret: process.env.AUTH0_CLIENT_SECRET_AUTH,
  adapter: PrismaAdapter(prisma),
};


export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
export { options };

