import { useQuery } from '@tanstack/react-query';
import { usersAPI } from '../services/users';

export const useUsers = (page = 1) => {
  const query = useQuery({
    queryKey: ['users', page],
    queryFn: () => usersAPI.getAll(page),
  });

  return {
    ...query,
    data: query.data?.data ?? [],
    pagination: query.data?.pagination,
  };
};
