import { CreateTask } from '@/services/task';
import { useMutation } from '@tanstack/react-query';

type MutationHandlers<T = any> = {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
};

export default function useCreateTaskMutation({
  onSuccess,
  onError,
}: MutationHandlers = {}) {
  const { isPending, mutate, error } = useMutation({
    mutationFn: CreateTask,
    onSuccess: (result) => {
      onSuccess?.(result?.data);
    },
    onError: (error) => {
      onError?.(error?.message);
    },
  });

  return {
    isPending,
    createTask: mutate,
    error,
  };
}

