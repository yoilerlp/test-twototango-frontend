'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { LogOut } from '../common/icons/LogOut';
import { removeTokenFromLocalStorage } from '@/helpers/token';

function Header() {
  const { data: session } = useSession();

  function handleSignOut() {
    removeTokenFromLocalStorage();
    signOut();
  }

  return (
    <div className='navbar bg-neutral text-neutral-content'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>Todo List</a>
      </div>
      <div className='flex-none'>
        <h4 className='text-white font-bold text-lg'>
          {session?.user?.name} {session?.user?.lastName}
        </h4>
        <button className='btn btn-ghost' onClick={handleSignOut}>
          <LogOut />
        </button>
      </div>
    </div>
  );
}

export default Header;

