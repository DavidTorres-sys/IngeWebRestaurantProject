import React from 'react'
import { Text } from "@/components/atoms/Text"
import { CircleUser } from 'lucide-react';

type UserDetailsSidebarProps = {
  userImage: string | null;
  userName: string;
  userRole: string;
}

const Index = ({ userImage, userName, userRole }: UserDetailsSidebarProps) => {
  const defaultImage = <CircleUser size={120} className="text-primary" />; // Default icon when image is not available

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-30 h-30 rounded-full overflow-hidden flex items-center justify-center">
        {userImage ? (
          <img
            src={userImage}
            alt="User Profile"
            width={120}
            height={120}
            className="object-cover w-full h-full"
          />
        ) : (
          defaultImage
        )}
      </div>
      <Text size="lg">
        {userName}
      </Text>
      <Text variant="secondary">
        {userRole}
      </Text>
    </div>
  )
}

export { Index as UserDetailsSidebar }
