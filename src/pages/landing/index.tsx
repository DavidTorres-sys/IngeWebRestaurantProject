import { Landing } from '@/components/organisms/Landing';
import { useSession } from 'next-auth/react';
import ReactLoading from 'react-loading';

export default function LandingPage() {
  return (
    <Landing />
  );
}
