import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { useSession } from 'next-auth/react';

type ProfileProps = {
  userId?: string; // Pass the user ID as a prop
};

const Profile = ({ userId }: ProfileProps) => {
  const { data: session, status } = useSession();
  
  const name = session?.user?.name || '';
  const email = session?.user?.email || '';
  const image = session?.user?.image || '';
  const role = session?.user?.role || '';

  return (
    <div className="mx-auto w-[900px] py-8">
      {/* Profile Header */}
      <h1 className="text-3xl font-bold text-primary mb-6">Profile</h1>

      <hr className="border-t-4 border-red-600 mb-6" />

      {/* Profile Card */}
      <Card className="shadow-2xl rounded-lg overflow-hidden h-96">
        <CardContent className="flex flex-row">
          {/* Left Section (Avatar & Name) */}
          <div className="w-1/3 bg-red-600 flex flex-col items-center justify-center text-white p-6 h-96">
            <Avatar className="w-32 h-32 bg-white">
              <AvatarImage src={image || '/default-avatar.png'} alt={name} />
            </Avatar>
            <h2 className="text-2xl font-semibold mt-4">{name}</h2>
            <p className="text-lg capitalize">{role}</p>
          </div>

          {/* Right Section (Details) */}
          <div className="w-2/3 bg-white p-6 h-96">
            <form className="space-y-4">
              {/* Name Field */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" defaultValue={name} readOnly />
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={email} readOnly />
              </div>

              {/* Phone Field */}
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="+57 319 123 4598" readOnly />
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
