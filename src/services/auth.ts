import { api } from './api';
import { LoginCredentials, AuthResponse } from '../types/auth';

export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth', { email, password });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.delete('/auth');
  },
};