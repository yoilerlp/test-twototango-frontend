'use client';
import React from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import { InputText } from '../common/InputText';
import Button from '../common/Button';
import { LoginSchemaType, LoginSchema } from '@/schemas/loginSchema';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const handleSubmitForm = (data: LoginSchemaType) => {
    setLoading(true);
    signIn('credentials', {
      username: data.email,
      password: data.password,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          toast.success('Sesion iniciada exitosamente');

          router.push('/dashboard');
        }
        if (res?.error) {
          toast.error(res.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
          required
        />
        <InputText
          {...register('password')}
          errorMsg={errors.password?.message}
          label='Contraseña'
          placeholder='Contraseña'
          type='password'
          required
        />

        <Button type='submit' className='my-5'>
          {loading ? (
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

