import { api } from './api';
import { UserMenuReport } from '../types/userMenuReport';
import { PaginatedResponse, parsePagination } from '../types/pagination';

export const userMenuReportsAPI = {
  getByUserId: async (userId: number, page = 1): Promise<PaginatedResponse<UserMenuReport>> => {
    const response = await api.get(`/users/${userId}/menu_reports`, { params: { page } });
    return { data: response.data, pagination: parsePagination(response.headers) };
  },
};
