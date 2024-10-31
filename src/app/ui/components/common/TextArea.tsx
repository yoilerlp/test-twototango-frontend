import { cn } from '@/helpers/styles';
import React from 'react';

type Props = React.ComponentProps<'textarea'> & {
  label?: string;
  errorMsg?: string;
};
export default function TextArea({
  label,
  errorMsg,
  className,
  ...restProps
}: Props) {
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <span className=' font-bold label-text'>{label}</span>
      </div>
      <textarea
        {...restProps}
        className={cn(
          'textarea textarea-bordered textarea-primary h-[150px] w-full resize-none',
          className,
          {
            'input-error': Boolean(errorMsg),
          }
        )}
      />
      {errorMsg ? (
        <div className='label'>
          <span className='label-text-alt text-red-500'>{errorMsg}</span>
        </div>
      ) : null}
    </label>
  );
}



