import { api } from './api';
import { Shop, ShopInput } from '../types/shop';

export const shopsAPI = {
  getAll: async (): Promise<Shop[]> => {
    const response = await api.get('/shops');
    return response.data;
  },

  getById: async (id: number): Promise<Shop> => {
    const response = await api.get(`/shops/${id}`);
    return response.data;
  },

  create: async (data: ShopInput): Promise<Shop> => {
    const response = await api.post('/shops', data);
    return response.data;
  },

  update: async (id: number, data: Partial<ShopInput>): Promise<Shop> => {
    const response = await api.put(`/shops/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/shops/${id}`);
  },
};