import InputForm from '@/components/organisms/NewUser';
import { useSession } from 'next-auth/react';
import ReactLoading from 'react-loading';

export default function NewUser() {
  const { data: session, status } = useSession();
  return (
    <div className="border-black">
      <InputForm />
    </div>
  );
}
