import { Shop } from './shop';

export interface Menu {
  id: number;
  name: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  shop: Shop;
  genre: Genre;
  soup: Soup;
  noodle: Noodle;
}

export interface MenuInput {
  name: string;
  shop_id: number;
  genre_id: number;
  soup_id: number;
  noodle_id: number;
  image?: File;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Soup {
  id: number;
  name: string;
}

export interface Noodle {
  id: number;
  name: string;
}