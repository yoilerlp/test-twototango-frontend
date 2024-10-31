'use client';

import { saveTokenToLocalStorage } from '@/helpers/token';
import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';

function CustomLoadingComponent() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <span className='loading loading-spinner loading-lg'></span>
    </div>
  );
}

export function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('hola')
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <AuthenticationWrapper>{children}</AuthenticationWrapper>
    </SessionProvider>
  );
}

function AuthenticationWrapper({ children }: { children: React.ReactNode }) {
  const { status, data } = useSession();
  console.log(status, data)
  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/auth/login';
      return;
    }
    // saveTokenToLocalStorage(data?.accessToken);
    const token = data?.user?.token;

    if (token) {
      saveTokenToLocalStorage(token);
    }
  }, [status, data]);

  if (status === 'loading') {
    return <CustomLoadingComponent />;
  }

  return children;
}

