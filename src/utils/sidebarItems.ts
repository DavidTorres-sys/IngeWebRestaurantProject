import { Home, User, Users, Archive, ShoppingCart, Ham } from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    title: "Home",
    url: "/landing",
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
    url: "/inventory",
    icon: Archive,
    roles: ["ADMIN"], // Only accessible by admin
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingCart,
    roles: ["ADMIN"], // Accessible by both admin
  }
  ,
  {
    title: "My Orders",
    url: "/my-orders",
    icon: ShoppingCart,
    roles: ["USER"], // Accessible by user
  },
  {
    title: "Menu",
    url: "/menu",
    icon: Ham,
    roles: ["ADMIN", "USER"], // Accessible by both admin and user
  },
];
