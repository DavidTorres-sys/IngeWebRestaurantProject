import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
  const userRole = session?.user.role || "ADMIN";
  const userId = session?.user.id;

  return (
    <div>
      <SidebarProvider>
        <AppSidebar role={userRole} image={UserImage} name={userName} id={userId} />
        <SidebarTrigger />
        <main className="flex items-center justify-center w-screen h-screen">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
