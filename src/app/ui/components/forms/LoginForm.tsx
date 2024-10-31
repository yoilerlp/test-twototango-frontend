'use client';
import React from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputText } from '../common/InputText';
import Button from '../common/Button';
import { LoginSchemaType, LoginSchema } from '@/schemas/loginSchema';
import { useLoginUserMutation } from '@/hooks/useLoginUserMutation';

export default function LoginForm() {
  // login user mutation
  const { isPending, loginUser } = useLoginUserMutation({
    onSuccess: () => {
      toast.success('Usuario logueado exitosamente');
    },
    onError: (msg) => {
      toast.error(msg);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const handleSubmitForm = (data: LoginSchemaType) => {
    loginUser(data);
  };

  return (
    <form
      className='w-full sm:max-w-2xl'
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <h3 className='text-2xl font-bold'>Iniciar Sesion</h3>
      <p className='mb-5'>
        Para iniciar sesion debes ingresar tu correo electronico y contraseña
      </p>
      <div className='flex flex-col gap-3'>
        <InputText
          {...register('email')}
          errorMsg={errors.email?.message}
          label='Email'
          type='email'
          placeholder='Correo Electronico'
        />
        <InputText
          {...register('password')}
          errorMsg={errors.password?.message}
          label='Contraseña'
          placeholder='Contraseña'
          type='password'
        />

        <Button type='submit' className='my-5'>
          {isPending ? (
            <span className='loading loading-ring loading-lg' />
          ) : (
            'Iniciar Sesion'
          )}
        </Button>
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

