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
} from "@/components/molecules/SidebarSection";
import { UserDetailsSidebar } from "@/components/molecules/UserDetailsSidebar";
import { Button } from "@/components/atoms/Button";
import { SIDEBAR_ITEMS } from "@/utils/sidebarItems";
import React from "react";

type SidebarProps = {
  role: string;
  name: string;
  image: string | null;
}

const Index = ({ role, name, image }: SidebarProps) => {
  // Filter sidebar items based on role
  const filteredItems = SIDEBAR_ITEMS.filter((item) => item.roles.includes(role));

  return (
    <Sidebar>
      <div className="p-5 h-full flex flex-col">
        <SidebarHeader>
          <UserDetailsSidebar 
            userImage={image} 
            userName={name} 
            userRole={role} 
          />
        </SidebarHeader>
        <SidebarContent className="flex-1 overflow-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredItems.map((item) => (
                  <SidebarMenuItem className="mt-2 mb-2" key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="mt-auto sticky bottom-0 w-full">
          <Button variant="secondary" size="lg">
            Logout
          </Button>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
};

export { Index as AppSidebar };
