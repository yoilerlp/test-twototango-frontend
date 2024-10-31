import { useMutation } from '@tanstack/react-query';
import { CreateUser } from '@/services/user';
import { User } from '@/interfaces/user';

type Params = {
  onSuccess?: (userCreated: User) => void;
  onError?: (msg: string) => void;
};

export const useCreateUserMutation = ({ onSuccess, onError }: Params = {}) => {
  const { isPending, mutate, error } = useMutation({
    mutationFn: CreateUser,
    onSuccess: (result) => {
      onSuccess?.(result?.data);
    },
    onError: (error) => {
      onError?.(error?.message);
    },
  });

  return {
    isPending,
    createUser: mutate,
    error,
  };
};

