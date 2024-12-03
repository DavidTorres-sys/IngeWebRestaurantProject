import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/organisms/Sidebar";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/molecules/Navbar";

export default function Home({ children }: any) {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const userName = session?.user.name || "Guest";
  const userImage = session?.user.image || null;
  const userRole = session?.user.role || "USER";
  const userId = session?.user.id;

  return (
    <div className="flex h-screen w-screen bg-white">
      <SidebarProvider>
        {isAuthenticated && (
          <>
            {/* Sidebar */}
            <AppSidebar role={userRole} image={userImage} name={userName} id={userId} />
            <SidebarTrigger />
          </>
        )}
        {/* Main Content */}
        <main className={`flex-1 h-full max-h-full overflow-y-auto ${!isAuthenticated ? "pl-0" : ""}`}>
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
