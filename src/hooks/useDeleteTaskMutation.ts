import { Task } from '@/interfaces/task';
import { DeleteTask } from '@/services/task';
import { useMutation } from '@tanstack/react-query';

type MutationHandler = {
  onSuccess?: (data: Task) => void;
  onError?: (error: string) => void;
};

export default function useDeleteTaskMutation({
  onSuccess,
  onError,
}: MutationHandler) {
  const { isPending, mutate, error } = useMutation({
    mutationFn: DeleteTask,
    onSuccess: (result) => {
      onSuccess?.(result?.data.task);
    },
    onError: (error) => {
      onError?.(error?.message);
    },
  });

  return {
    isPending,
    deleteTask: mutate,
    error,
  };
}

