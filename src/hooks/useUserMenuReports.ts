import { useQuery } from '@tanstack/react-query';
import { userMenuReportsAPI } from '../services/userMenuReports';

export const useUserMenuReports = (userId: number, page = 1) => {
  const query = useQuery({
    queryKey: ['userMenuReports', userId, page],
    queryFn: () => userMenuReportsAPI.getByUserId(userId, page),
    enabled: !!userId,
  });

  return {
    ...query,
    data: query.data?.data ?? [],
    pagination: query.data?.pagination,
  };
};
