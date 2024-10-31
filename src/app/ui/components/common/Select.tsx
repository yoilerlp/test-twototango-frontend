import { cn } from '@/helpers/styles';
import React from 'react';

type Props = React.ComponentProps<'select'> & {
  label?: string;
  errorMsg?: string;
  options: { label: string; value: string }[];
};

export const Select = ({
  label,
  errorMsg,
  className,
  options,
  ...restProps
}: Props) => {
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <span className=' font-bold label-text'>{label}</span>
      </div>
      <select
        className={cn(
          'select select-bordered select-primary w-full',
          {
            'select-error': Boolean(errorMsg),
          },
          className
        )}
        {...restProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMsg ? (
        <div className='label'>
          <span className='label-text-alt text-red-500'>{errorMsg}</span>
        </div>
      ) : null}
    </label>
  );
};

<label className='form-control w-full max-w-xs'>
  <div className='label'>
    <span className='label-text'>Pick the best fantasy franchise</span>
    <span className='label-text-alt'>Alt label</span>
  </div>
  <select className='select select-bordered'>
    <option disabled selected>
      Pick one
    </option>
    <option>Star Wars</option>
    <option>Harry Potter</option>
    <option>Lord of the Rings</option>
    <option>Planet of the Apes</option>
    <option>Star Trek</option>
  </select>
  <div className='label'>
    <span className='label-text-alt'>Alt label</span>
    <span className='label-text-alt'>Alt label</span>
  </div>
</label>;

