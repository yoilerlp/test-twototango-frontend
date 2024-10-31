import { cn } from '@/helpers/styles';
import React from 'react';

type Props = React.ComponentProps<'input'> & {
  label?: string;
  errorMsg?: string;
};

export const InputText = ({
  label,
  errorMsg,
  className,
  ...restProps
}: Props) => {
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <span className=' font-bold label-text'>{label}</span>
      </div>
      <input
        {...restProps}
        className={cn('input input-primary input-bordered w-full', className, {
          'input-error': Boolean(errorMsg),
        })}
      />
      {errorMsg ? (
        <div className='label'>
          <span className='label-text-alt text-red-500'>{errorMsg}</span>
        </div>
      ) : null}
    </label>
  );
};

