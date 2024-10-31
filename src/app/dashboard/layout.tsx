import { SessionProviderWrapper } from '@/context/SessionProvider';
import React, { PropsWithChildren } from 'react';
import DashBoardLayout from '../ui/components/layout/DashBoardLayout';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SessionProviderWrapper>
      <DashBoardLayout>{children}</DashBoardLayout>
    </SessionProviderWrapper>
  );
}

