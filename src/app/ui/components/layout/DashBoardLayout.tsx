import React, { PropsWithChildren } from 'react';
import Header from './Header';

export default function DashBoardLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <Header />
      <div className='p-4 sm:p-5 sm:mx-auto max-w-6xl '>{children}</div>
    </main>
  );
}

