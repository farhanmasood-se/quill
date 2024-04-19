import { useRouter, useSearchParams } from 'next/navigation';

const AuthCallback = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get('origin'); 
};

export default AuthCallback;
