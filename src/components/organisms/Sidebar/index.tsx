import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { UserDetailsSidebar } from "@/components/molecules/UserDetailsSidebar";
import { Button } from "@/components/ui/button";
import { SIDEBAR_ITEMS } from "@/utils/sidebarItems";

type SidebarProps = {
  id?: string;
  role: string;
  name: string;
  image: string | null;
};

const Index = ({ id, role, name, image }: SidebarProps) => {
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Actualiza dinámicamente la URL del perfil
  const sidebarItemsWithProfile = SIDEBAR_ITEMS.map(item =>
    item.title === "Profile" ? { ...item, url: `/users/${id}` } : item
  );

  return (
    <Sidebar>
      <div className="p-5 h-full flex flex-col">
        <SidebarHeader>
          <UserDetailsSidebar userImage={image} userName={name} userRole={role} />
        </SidebarHeader>
        <SidebarContent className="flex-1 overflow-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItemsWithProfile
                  .filter(item => item.roles.includes(role))
                  .map((item, index) => {
                    // Verifica si el elemento coincide con la URL actual
                    const isActive = router.asPath === item.url;

                    return (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={item.url}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                              isActive
                                ? "bg-primary text-white"
                                : "hover:bg-gray-200 text-gray-900" 
                            }`}
                          >
                            <item.icon className="w-5 h-5" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="mt-auto sticky bottom-0 w-full">
          <Button onClick={logout} variant="secondary" size="lg">
            Logout
          </Button>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
};

export { Index as AppSidebar };
