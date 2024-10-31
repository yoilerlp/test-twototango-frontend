import React, { PropsWithChildren } from 'react';
import Button from '../../common/Button';

export function TasksList({ children }: PropsWithChildren) {
  return (
    <div className='mt-4 max-sm:px-4 grid grid-cols-1 lg:grid-cols-3 gap-5 '>
      {children}
    </div>
  );
}

export const TaskSkeleton = () => {
  return (
    <div className='mt-4 grid grid-cols-1 lg:grid-cols-3 gap-5 '>
      {Array.from({ length: 15 }).map((_, index) => (
        <div className='w-full' key={`skeleton-${index}-loading`}>
          <div className='skeleton h-4 w-1/2 mb-2'></div>
          <div className='skeleton h-4 w-full mb-4'></div>
          <div className='flex gap-4 justify-between'>
            <div className='skeleton h-4 w-full mb-4'></div>
            <div className='skeleton h-4 w-full mb-4'></div>
            <div className='skeleton h-4 w-full mb-4'></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const TaskListEmpty = ({
  onCliCkCreate,
}: {
  onCliCkCreate: () => void;
}) => {
  return (
    <div className='my-4 flex justify-center items-center '>
      <div className='flex flex-col justify-center'>
        <h3>No hay tareas disponibles</h3>
        <br />
        <Button onClick={onCliCkCreate} type='button'>
          Crear tarea
        </Button>
      </div>
    </div>
  );
};

