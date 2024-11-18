import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/molecules/SidebarSection";
import { AppSidebar } from "@/components/organisms/Sidebar";
import { sign } from "crypto";
import { useSession, signIn } from "next-auth/react";

export default function Home({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  if (!session) {
    signIn('auth0');
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
