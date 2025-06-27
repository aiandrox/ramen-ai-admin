import { api } from "./api";
import { Menu, MenuInput, Genre, Soup, Noodle } from "../types/menu";

export const menusAPI = {
  getAll: async (): Promise<Menu[]> => {
    const response = await api.get("/menus");
    return response.data;
  },

  getById: async (id: number): Promise<Menu> => {
    const response = await api.get(`/menus/${id}`);
    return response.data;
  },

  create: async (data: MenuInput): Promise<Menu> => {
    const formData = new FormData();
    formData.append("menu[name]", data.name);
    formData.append("menu[shop_id]", data.shop_id.toString());
    formData.append("menu[genre_id]", data.genre_id.toString());
    formData.append("menu[soup_id]", data.soup_id.toString());
    formData.append("menu[noodle_id]", data.noodle_id.toString());

    if (data.image) {
      formData.append("menu[image]", data.image);
    }

    const response = await api.post("/menus", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  update: async (id: number, data: Partial<MenuInput>): Promise<Menu> => {
    const formData = new FormData();

    if (data.name) formData.append("menu[name]", data.name);
    if (data.shop_id) formData.append("menu[shop_id]", data.shop_id.toString());
    if (data.genre_id) formData.append("menu[genre_id]", data.genre_id.toString());
    if (data.soup_id) formData.append("menu[soup_id]", data.soup_id.toString());
    if (data.noodle_id) formData.append("menu[noodle_id]", data.noodle_id.toString());
    if (data.image) formData.append("menu[image]", data.image);

    const response = await api.put(`/menus/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/menus/${id}`);
  },

  // Reference data
  getGenres: async (): Promise<Genre[]> => {
    const response = await api.get("/genres");
    return response.data;
  },

  getSoups: async (): Promise<Soup[]> => {
    const response = await api.get("/soups");
    return response.data;
  },

  getNoodles: async (): Promise<Noodle[]> => {
    const response = await api.get("/noodles");
    return response.data;
  },
};
