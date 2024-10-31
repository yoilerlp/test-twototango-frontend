'use client';
import React from 'react';
import Button from './ui/components/common/Button';

function ErrorScreen({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='w-full min-h-screen flex flex-col bg-bh-purple-secundary items-center justify-center gap-5'>
      <h1 className='text-bh-white text-2xl text-center font-extrabold'>
        Ha ocurrido un error inesperado
      </h1>

      {error?.message && (
        <p className='text-bh-white text-center'>{error?.message}</p>
      )}

      <Button onClick={reset} type='button'>
        Reintentar
      </Button>
    </div>
  );
}

export default ErrorScreen;

