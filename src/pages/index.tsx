import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/molecules/SidebarSection";
import { AppSidebar } from "@/components/organisms/Sidebar";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

export default function Home({ children }: any) {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (!session && status !== "loading") {
      signIn("auth0");
    }
  }, [session, status]);

  const userName = session?.user.name || "Guest";
  const UserImage = session?.user.image || null;

  return (
    <div>
      <SidebarProvider>
        <AppSidebar role="admin" image={UserImage} name={userName} />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
