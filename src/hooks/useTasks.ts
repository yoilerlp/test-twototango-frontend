import { TaskStatus } from '@/interfaces/task';
import { GetAllTasks } from '@/services/task';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type Params = {
  page?: number;
  status?: TaskStatus;
};

export default function useTasks({
  page = 1,
  status = TaskStatus.PENDING,
}: Params = {}) {
  const queryClient = useQueryClient();

  const key = ['task', `tasks-filer:${status}:${page}`];

  const handleInvalidate = () => {
    queryClient.invalidateQueries({
      queryKey: ['task'],
      exact: false,
      refetchType: 'all',
    });
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: key,
    queryFn: () =>
      GetAllTasks({
        page,
        status,
      }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return {
    data: data?.rows,
    total: data?.total,
    isLoading,
    error,
    refetch,
    handleInvalidate,
  };
}

