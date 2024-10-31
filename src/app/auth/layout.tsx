import React, { PropsWithChildren } from 'react';
import AuthLayoutWrapper from '../ui/components/layout/AuthLayoutWrapper';

function AuthLayout({ children }: PropsWithChildren) {
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
}

export default AuthLayout;

