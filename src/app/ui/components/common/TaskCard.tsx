/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useMemo } from 'react';
import Button from './Button';
import { Trash } from './icons/Delete';
import { Task, TaskStatus } from '@/interfaces/task';
import { cn } from '@/helpers/styles';
import { Edit } from './icons/Edit';
import { formatDateForInput } from '@/helpers/date';

type TaskCardProps = {
  task: Task;
  onClickEdit?: (task: Task) => void;
  onClickDelete?: (task: Task) => void;
  onClickUpdateStatus?: (newStatus: TaskStatus) => void;
};

export default function TaskCard({
  task,
  onClickDelete,
  onClickEdit,
  onClickUpdateStatus,
}: TaskCardProps) {
  const { title, description, status } = task;

  const taskIsOutdated = useMemo(() => {
    const outDate = new Date(task.dueDate) < new Date();
    return outDate && status !== TaskStatus.COMPLETED;
  }, [task]);

  const handleMarkAsPending = () => {
    onClickUpdateStatus?.(TaskStatus.PENDING);
  };

  const handleMarkAsCompleted = () => {
    onClickUpdateStatus?.(TaskStatus.COMPLETED);
  };

  const handleMarkAsInProgress = () => {
    onClickUpdateStatus?.(TaskStatus.IN_PROGRESS);
  };

  return (
    <div
      className={cn('card bg-base-100 shadow-xl border-t-4 border-twototango', {
        'border-red-700': status === TaskStatus.PENDING,
        'border-green-600': status === TaskStatus.COMPLETED,
        'border-blue-600': status === TaskStatus.IN_PROGRESS,
        'border-twototango border-2': taskIsOutdated,
      })}
    >
      <div className='card-body'>
        <div className='tooltip text-left' data-tip={title}>
          <h2 className='card-title line-clamp-2'>{title}</h2>
        </div>
        <div className='h-[70px] line-clamp-3 mb-3'>
          <p>{description}</p>
        </div>
        <div className='flex gap-2 items-center mb-2 '>
          <span>Fecha limite</span>
          <div
            className={cn('badge badge-accent gap-2', {
              'badge-warning': taskIsOutdated,
            })}
          >
            {formatDateForInput(task.dueDate)}
          </div>
        </div>
        <div className='card-actions'>
          {status == TaskStatus.PENDING ? (
            <Button onClick={handleMarkAsInProgress} className='btn-xs'>
              Mover a en Progreso
            </Button>
          ) : null}

          {status === TaskStatus.IN_PROGRESS ? (
            <>
              <Button onClick={handleMarkAsPending} className='btn-xs'>
                Mover a en Pendiente
              </Button>
              <Button onClick={handleMarkAsCompleted} className='btn-xs'>
                Mover a Completado
              </Button>
            </>
          ) : null}

          {status === TaskStatus.COMPLETED ? (
            <Button onClick={handleMarkAsInProgress} className='btn-xs'>
              Mover a en Progreso
            </Button>
          ) : null}
        </div>
        <div className='ml-auto max-sm:mt-3  flex gap-2'>
          <div className='tooltip text-left' data-tip='Eliminar tarea'>
            <Trash
              className='size-6 cursor-pointer'
              // fill='red'
              onClick={() => onClickDelete?.(task)}
            />
          </div>
          <div className='tooltip text-left' data-tip='Editar tarea'>
            <Edit
              className='size-6 cursor-pointer'
              onClick={() => onClickEdit?.(task)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

