import { Task } from '@/interfaces/task';
import { UpdateTask } from '@/services/task';
import { useMutation } from '@tanstack/react-query';

type MutationHandler = {
  onSuccess?: (data: Task) => void;
  onError?: (error: string) => void;
};

export default function useUpdateTaskMutation({
  onSuccess,
  onError,
}: MutationHandler) {
  const { isPending, mutate, error } = useMutation({
    mutationFn: UpdateTask,
    onSuccess: (result) => {
      onSuccess?.(result?.data);
    },
    onError: (error) => {
      onError?.(error?.message);
    },
  });

  return {
    isPending,
    updateTask: mutate,
    error,
  };
}

