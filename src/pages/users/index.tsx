import UsersTable from '@/components/organisms/Users';
import { useSession } from 'next-auth/react';
import ReactLoading from 'react-loading';

export default function Orders() {
  const { data: session, status } = useSession();
  return (
    <div className="border-black">
      <UsersTable />
    </div>
  );
}
