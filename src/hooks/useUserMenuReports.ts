import { useQuery } from '@tanstack/react-query';
import { userMenuReportsAPI } from '../services/userMenuReports';

export const useUserMenuReports = (userId: number) => {
  return useQuery({
    queryKey: ['userMenuReports', userId],
    queryFn: () => userMenuReportsAPI.getByUserId(userId),
    enabled: !!userId,
  });
};
