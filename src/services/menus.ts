import { api } from './api';
import { Menu, MenuInput, Genre, Soup, Noodle } from '../types/menu';

export const menusAPI = {
  getAll: async (): Promise<Menu[]> => {
    const response = await api.get('/menus');
    return response.data;
  },

  getById: async (id: number): Promise<Menu> => {
    const response = await api.get(`/menus/${id}`);
    return response.data;
  },

  create: async (data: MenuInput): Promise<Menu> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('shop_id', data.shop_id.toString());
    formData.append('genre_id', data.genre_id.toString());
    formData.append('soup_id', data.soup_id.toString());
    formData.append('noodle_id', data.noodle_id.toString());
    
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await api.post('/menus', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id: number, data: Partial<MenuInput>): Promise<Menu> => {
    const formData = new FormData();
    
    if (data.name) formData.append('name', data.name);
    if (data.shop_id) formData.append('shop_id', data.shop_id.toString());
    if (data.genre_id) formData.append('genre_id', data.genre_id.toString());
    if (data.soup_id) formData.append('soup_id', data.soup_id.toString());
    if (data.noodle_id) formData.append('noodle_id', data.noodle_id.toString());
    if (data.image) formData.append('image', data.image);

    const response = await api.put(`/menus/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  attachImage: async (id: number, image: File): Promise<Menu> => {
    const formData = new FormData();
    formData.append('image', image);

    const response = await api.patch(`/menus/${id}/attach_image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/menus/${id}`);
  },

  // Reference data
  getGenres: async (): Promise<Genre[]> => {
    const response = await api.get('/genres');
    return response.data;
  },

  getSoups: async (): Promise<Soup[]> => {
    const response = await api.get('/soups');
    return response.data;
  },

  getNoodles: async (): Promise<Noodle[]> => {
    const response = await api.get('/noodles');
    return response.data;
  },
};