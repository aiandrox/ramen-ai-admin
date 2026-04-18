export interface Shop {
  id: number;
  name: string;
  address: string;
  google_map_url: string;
  created_at: string;
  updated_at: string;
  latitude: number;
  longitude: number;
  menus?: MenuSummary[];
}

export interface MenuSummary {
  id: number;
  name: string;
}

export interface ShopInput {
  google_map_url: string;
  name?: string;
  address?: string;
}

export interface ShopUpdateInput {
  name: string;
}