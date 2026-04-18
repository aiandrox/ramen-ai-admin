import { api } from './api';
import { User } from '../types/user';
import { PaginatedResponse, parsePagination } from '../types/pagination';

export const usersAPI = {
  getAll: async (page = 1): Promise<PaginatedResponse<User>> => {
    const response = await api.get('/users', { params: { page } });
    return { data: response.data, pagination: parsePagination(response.headers) };
  },
};
