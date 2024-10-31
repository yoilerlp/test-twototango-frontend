import Link from 'next/link';
import React from 'react';
import Button from './ui/components/common/Button';

function NoFoundPage() {
  return (
    <div className='w-full min-h-screen flex flex-col bg-bh-purple-secundary items-center justify-center gap-5'>
      <h1 className='text-bh-white text-2xl text-center font-extrabold'>
        Página no encontrada
      </h1>

      <Link href='/'>
        <Button type='button'>Ir al inicio</Button>
      </Link>
    </div>
  );
}

export default NoFoundPage;

