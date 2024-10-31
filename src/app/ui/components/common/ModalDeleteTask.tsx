import React from 'react';
import ModalBase from './ModalBase';
import Button from './Button';

type ModalDeleteTaskProps = {
  open: boolean;
  onClose: () => void;
  onClickDelete: () => void;
};

function ModalDeleteTask({
  open,
  onClose,
  onClickDelete,
}: ModalDeleteTaskProps) {
  return (
    <ModalBase open={open} onClose={onClose}>
      <div className='w-full'>
        <h4 className='font-bold text-2xl mb-4 text-center'>
          Seguro que quieres eliminar la tarea ?
        </h4>
        <div className='flex gap-3 justify-between'>
          <div className='w-1/2'>
            <Button onClick={onClose} className=' btn-block btn-outline'>
              Cancelar
            </Button>
          </div>
          <div className='w-1/2'>
            <Button onClick={onClickDelete} className='btn-block btn-primary'>
              Elimar
            </Button>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}

export default ModalDeleteTask;

