import { cn } from '@/helpers/styles';
import React from 'react';

type Props = React.ComponentProps<'button'>;

export default function Button({
  className,
  type = 'button',
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        'btn btn-primary font-bold text-white text-base',
        className
      )}
    >
      {children}
    </button>
  );
}

