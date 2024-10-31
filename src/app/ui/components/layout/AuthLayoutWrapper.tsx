import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

export default function AuthLayoutWrapper({ children }: PropsWithChildren) {
  return (
    <main className='flex h-screen'>
      <section className='sm:w-1/2 bg-twototango text-white flex flex-col justify-center items-center'>
        <h1 className='text-[50px] font-bold underline'>Todo List App</h1>
        <h2 className='underline text-4xl mb-4'>
          <Link href={'https://www.linkedin.com/in/yoyler-cordoba/'}>
            By Yoyler Mosquera Cordoba
          </Link>
        </h2>
        <p className='text-lg font-medium'>
          A simple todo list app for two to Tango
        </p>
      </section>
      <section className='grow p-4 w-full sm:w-1/2 sm:flex sm:justify-center sm:items-center'>
        {children}
      </section>
    </main>
  );
}

