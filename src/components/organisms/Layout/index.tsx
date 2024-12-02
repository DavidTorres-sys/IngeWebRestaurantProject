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
  const userRole = session?.user.role || "USER";
  const userId = session?.user.id;

  return (
    <div className="flex h-screen w-screen bg-white">
      <SidebarProvider>
        {/* Sidebar */}
        <AppSidebar role={userRole} image={UserImage} name={userName} id={userId} />
        <SidebarTrigger />
        {/* Main Content */}
        <main className="flex-1 h-full max-h-full overflow-y-auto p-6">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
