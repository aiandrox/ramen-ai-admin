import { Shop } from './shop';

export interface Menu {
  id: number;
  name: string;
  shop_id: number;
  image_url: string;
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
  image: File;
  genre_id?: number;
  soup_id?: number;
  noodle_id?: number;
}

export interface MenuUpdateInput {
  name?: string;
  genre_id?: number;
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