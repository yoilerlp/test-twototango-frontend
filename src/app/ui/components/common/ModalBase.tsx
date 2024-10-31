import { cn } from '@/helpers/styles';
import { useOuterClick } from '@/hooks/useOuterClick';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  open?: boolean;
  onClose?: () => void;
  title?: string;
}>;
export default function ModalBase({ open, children, title, onClose }: Props) {
  const ref = useOuterClick(() => {
    console.log('called on close');
    onClose?.();
  });

  return (
    <dialog
      className={cn('modal', {
        'modal-open': open,
      })}
      open={open}
    >
      <div
        className='modal-box max-h-[70vh]'
        ref={ref as React.LegacyRef<HTMLDivElement>}
      >
        <form method='dialog'>
          <button
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <div className='p-4'>
          {title && <h3 className='font-bold text-lg mb-2'>{title}</h3>}
          {children}
        </div>
      </div>
    </dialog>
  );
}

