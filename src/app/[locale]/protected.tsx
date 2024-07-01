// pages/protected-page.js
import { getSession } from 'next-auth/react';
import { useAppSelector } from '@src/hooks/useRedux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function ProtectedPage() {
  const router = useRouter();
  const { authState } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!authState) {
      router.push('/asdasd');
    }
  }, [authState, router]);

  return <div>Protected Content</div>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
