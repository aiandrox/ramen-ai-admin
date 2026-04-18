import { api } from './api';
import { UserMenuReport } from '../types/userMenuReport';

export const userMenuReportsAPI = {
  getByUserId: async (userId: number): Promise<UserMenuReport[]> => {
    const response = await api.get(`/users/${userId}/menu_reports`);
    return response.data;
  },
};
