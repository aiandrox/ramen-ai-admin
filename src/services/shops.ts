import { api } from './api';
import { Shop, ShopInput, ShopUpdateInput } from '../types/shop';
import { PaginatedResponse, parsePagination } from '../types/pagination';

export const shopsAPI = {
  getAll: async (page = 1): Promise<PaginatedResponse<Shop>> => {
    const response = await api.get('/shops', { params: { page } });
    return { data: response.data, pagination: parsePagination(response.headers) };
  },

  getById: async (id: number): Promise<Shop> => {
    const response = await api.get(`/shops/${id}`);
    return response.data;
  },

  create: async (data: ShopInput): Promise<Shop> => {
    const response = await api.post('/shops', { shop: data });
    return response.data;
  },

  update: async (id: number, data: ShopUpdateInput): Promise<Shop> => {
    const response = await api.patch(`/shops/${id}`, { shop: data });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/shops/${id}`);
  },
};