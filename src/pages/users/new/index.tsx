import InputForm from '@/components/organisms/NewUser';
import { useSession } from 'next-auth/react';
import ReactLoading from 'react-loading';

export default function NewUser() {
  const { data: session, status } = useSession();
  // if (status === 'loading') return <ReactLoading type='spin' color='#683f85' />;
  // if (session?.user.role !== 'ADMIN') return <div>Access Denied</div>;
  return (
    <div className="border-black">
      <InputForm />
    </div>
  );
}
