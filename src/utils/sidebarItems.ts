import { Home, User, Users, Archive, ShoppingCart, Ham } from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    title: "Home",
    url: "",
    icon: Home,
    roles: ["ADMIN", "USER"], // Accessible by both admin and user
  },
  {
    title: "Profile",
    url: "/users/[id]",
    icon: User,
    roles: ["ADMIN", "USER"], // Accessible by both admin and user
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
    roles: ["ADMIN"], // Only accessible by admin
  },
  {
    title: "Inventory",
    url: "/users/[id]",
    icon: Archive,
    roles: ["ADMIN"], // Only accessible by admin
  },
  {
    title: "Orders",
    url: "#",
    icon: ShoppingCart,
    roles: ["ADMIN", "USER"], // Accessible by both admin and user
  },
  {
    title: "Menu",
    url: "#",
    icon: Ham,
    roles: ["ADMIN", "USER"], // Accessible by both admin and user
  },
];
