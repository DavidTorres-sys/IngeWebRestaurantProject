import { PrismaClient } from "@prisma/client";
import safeJsonStringify from "safe-json-stringify";
import { useSession, signIn } from "next-auth/react";

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  console.log(safeJsonStringify(users));
  return { props: { users: safeJsonStringify(users) } };
}

export default function Home({ users }: any) {
  const { data: session } = useSession();

  if (!session) {
    signIn('auth0');
  }
  console.log(users);
  return (
    <div>
      <h1>Hello Robinsón Coronado</h1>
    </div>
  );
}
