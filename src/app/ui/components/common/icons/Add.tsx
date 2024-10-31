import React from 'react';

type Props = React.ComponentProps<'svg'>;

export function Add({ fill = 'currentColor', ...props }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24px'
      viewBox='0 -960 960 960'
      fill={fill}
      {...props}
    >
      <path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z' />
    </svg>
  );
}

