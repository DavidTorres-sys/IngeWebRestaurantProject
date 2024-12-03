import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const Navbar = () => {
  return (
    <div className="h-16 shadow-lg bg-white mb-10">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <img
            src="/images/restoreclogo.png"
            alt="Dish 1"
            className="w-20 h-10 object-cover"
          />
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <Button onClick={() => signIn("auth0")} className="bg-primary text-white px-4 py-2 rounded-md">Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
};