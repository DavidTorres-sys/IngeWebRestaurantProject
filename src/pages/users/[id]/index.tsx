import Profile from '@/components/organisms/Profile';
import { useSession } from 'next-auth/react';
import ReactLoading from 'react-loading';

export default function Users() {
  const { data: session, status } = useSession();
  // Ensure session contains userId
  const userId = session?.user?.id;

  return (
    <div>
      {/* Pass userId to Profile component */}
      <Profile userId={userId} />
    </div>
  );
}
