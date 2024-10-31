'use client';
import React, { useEffect } from 'react';
import ModalBase from '../common/ModalBase';
import { InputText } from '../common/InputText';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import { useForm } from 'react-hook-form';
import { TaskSchema, CreateTaskSchema } from '@/schemas/taskSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskStatus } from '@/interfaces/task';
import { formatDateForInput } from '@/helpers/date';
import { Select } from '../common/Select';

type CreateTaskFormProps = {
  isUpdating?: boolean;
  isOpenModal?: boolean;
  initialStatus?: TaskStatus;
  initialValues?: Partial<CreateTaskSchema>;
  loading?: boolean;

  onSubmit?: (data: CreateTaskSchema) => void;
  onCloseModal?: () => void;
};

export default function CreateTaskForm({
  onSubmit,
  onCloseModal,
  initialValues,
  isUpdating,
  initialStatus = TaskStatus.PENDING,
  isOpenModal,
  loading,
}: CreateTaskFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskSchema>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      status: initialStatus,
    },
  });

  useEffect(() => {
    if (initialValues && isUpdating) {
      reset({
        ...initialValues,
        dueDate: initialValues?.dueDate
          ? formatDateForInput(initialValues?.dueDate)
          : '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, isUpdating]);

  const handleSubmitForm = (data: CreateTaskSchema) => {
    onSubmit?.(data);
  };

  if (!isOpenModal) {
    return null;
  }

  return (
    <ModalBase open={isOpenModal} onClose={onCloseModal}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className='flex flex-col gap-1 mb-5'>
          <InputText
            {...register('title')}
            errorMsg={errors.title?.message}
            required
            type='text'
            label='Titulo'
            className='w-full'
            placeholder='Ejemplo'
          />

          <TextArea
            {...register('description')}
            errorMsg={errors.description?.message}
            required
            label='Descripcion'
            className='w-full'
            placeholder='Descripción de la tarea'
            maxLength={200}
          />
          <InputText
            {...register('dueDate')}
            errorMsg={errors.dueDate?.message}
            required
            type='date'
            label='Fecha limite'
            className='w-full'
            min={formatDateForInput(new Date().toISOString())}
          />

          {isUpdating ? (
            <Select
              {...register('status')}
              errorMsg={errors.status?.message}
              required
              label='Estado'
              className='w-full'
              options={[
                { label: 'Pendiente', value: TaskStatus.PENDING },
                { label: 'En progreso', value: TaskStatus.IN_PROGRESS },
                { label: 'Completada', value: TaskStatus.COMPLETED },
              ]}
            />
          ) : null}
        </div>
        <div className='flex justify-end'>
          <Button type='submit' className='btn-block'>
            {loading ? (
              <span className='loading loading-spinner'></span>
            ) : (
              <span>{isUpdating ? 'Actualizar' : 'Crear'}</span>
            )}
          </Button>
        </div>
      </form>
    </ModalBase>
  );
}

