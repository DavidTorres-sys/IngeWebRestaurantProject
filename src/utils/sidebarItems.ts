import { Home, User, Users, Archive, ShoppingCart, Ham } from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    title: "Home",
    url: "#",
    icon: Home,
    roles: ["admin", "user"], // Accessible by both admin and user
  },
  {
    title: "Profile",
    url: "#",
    icon: User,
    roles: ["admin", "user"], // Accessible by both admin and user
  },
  {
    title: "Users",
    url: "#",
    icon: Users,
    roles: ["admin"], // Only accessible by admin
  },
  {
    title: "Inventory",
    url: "#",
    icon: Archive,
    roles: ["admin"], // Only accessible by admin
  },
  {
    title: "Orders",
    url: "#",
    icon: ShoppingCart,
    roles: ["admin", "user"], // Accessible by both admin and user
  },
  {
    title: "Menu",
    url: "#",
    icon: Ham,
    roles: ["admin", "user"], // Accessible by both admin and user
  },
];
