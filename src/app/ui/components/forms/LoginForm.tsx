import React from 'react';
import { InputText } from '../common/InputText';
import Button from '../common/Button';
import Link from 'next/link';

export default function LoginForm() {
  return (
    <form className='w-full sm:max-w-2xl'>
      <h3 className='text-2xl font-bold'>Iniciar Sesion</h3>
      <p className='mb-5'>
        Para iniciar sesion debes ingresar tu correo electronico y contraseña
      </p>
      <div className='flex flex-col gap-3'>
        <InputText
          label='Email'
          type='email'
          placeholder='Correo Electronico'
        />
        <InputText label='Contraseña' placeholder='Contraseña' />

        <Button className='my-5'>Iniciar Sesion</Button>
      </div>

      <div>
        <p className='text-center'>
          ¿No tienes cuenta?{' '}
          <Link href={'/auth/register'} className='underline'>
            Registrate
          </Link>
        </p>
      </div>
    </form>
  );
}

