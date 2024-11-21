import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/molecules/SidebarSection";
import { AppSidebar } from "@/components/organisms/Sidebar";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

export default function Home({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status !== "loading") {
      signIn("auth0");
    }
  }, [session, status]);

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar role="" image={null} name="" />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
