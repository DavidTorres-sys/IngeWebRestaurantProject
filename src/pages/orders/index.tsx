import OrdersTable from '@/components/organisms/Orders';
import { useSession } from 'next-auth/react';

export default function Users() {
  const { data: session, status } = useSession();
  // if (session?.user.role !== 'ADMIN') return <div>Access Denied</div>;
  return (
    <div className="border-black">
      <OrdersTable />
    </div>
  );
}
