'use client';
import React from 'react';
import Link from 'next/link';

import { InputText } from '../common/InputText';
import Button from '../common/Button';
import { RegisterSchema, RegisterSchemaType } from '@/schemes/registerScheme';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const handleSubmitForm = (data: RegisterSchemaType) => {
    console.log(data);
  };

  return (
    <form className='w-full sm:max-w-2xl'>
      <h3 className='text-2xl font-bold'>Registrarse</h3>
      <p className='mb-3'>
        Completa los siguientes campos para crear tu cuenta
      </p>
      <div className='flex flex-col gap-3 mb-3'>
        <InputText
          label='Nombre'
          placeholder='Nombre'
          {...register('name')}
          errorMsg={errors.name?.message}
          required
        />

        <InputText
          label='Apellidos'
          type='email'
          placeholder='Apellidos'
          {...register('lastName')}
          errorMsg={errors.lastName?.message}
          required
        />

        <InputText
          label='Email'
          type='email'
          placeholder='Correo Electronico'
          {...register('email')}
          required
          errorMsg={errors.email?.message}
        />

        <InputText
          type='password'
          label='Contraseña'
          placeholder='Contraseña'
          {...register('password')}
          required
          errorMsg={errors.password?.message}
        />
        <Button onClick={handleSubmit(handleSubmitForm)} className='mt-3'>
          Registrarse
        </Button>
      </div>
      <div>
        <p className='text-center'>
          ¿Ya tienes cuenta?{' '}
          <Link href={'/auth/login'} className='underline'>
            Iniciar Sesion
          </Link>
        </p>
      </div>
    </form>
  );
}

