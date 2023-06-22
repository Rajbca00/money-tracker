import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

const withAuth = (Component) => {
  return () => {
    const router = useRouter();
    const {user,isLoading,error} = useUser()
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if (!user) {
      router.push('/login');
    }else{
    return <Component/>
    }
  }
};

export default withAuth;
