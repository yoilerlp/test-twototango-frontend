import React from 'react';
import { Add } from './icons/Add';

export default function FAB() {
  return (
    <button className='fixed bottom-5 right-5 btn-circle btn text-2xl'>
      <Add fill='red' className='size-10' />
    </button>
  );
}

