import { useMutation } from '@tanstack/react-query';
import { LoginUser } from '@/services/user';
import { LoginResponse } from '@/interfaces/user';

type Params = {
  onSuccess?: (userCreated: LoginResponse) => void;
  onError?: (msg: string) => void;
};

export const useLoginUserMutation = ({ onSuccess, onError }: Params = {}) => {
  const { isPending, mutate, error } = useMutation({
    mutationFn: LoginUser,
    onSuccess: (result) => {
      onSuccess?.(result?.data);
    },
    onError: (error) => {
      onError?.(error?.message);
    },
  });

  return {
    isPending,
    loginUser: mutate,
    error,
  };
};

