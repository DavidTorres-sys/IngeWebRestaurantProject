import UsersTable from '@/components/organisms/Users';
import { useSession } from 'next-auth/react';
import ReactLoading from 'react-loading';

export default function Users() {
  const { data: session, status } = useSession();
  // if (session?.user.role !== 'ADMIN') return <div>Access Denied</div>;
  return (
    <div className="border-black">
      <UsersTable />
    </div>
  );
}
