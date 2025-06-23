export interface Shop {
  id: number;
  name: string;
  address: string;
  google_map_url: string;
  created_at: string;
  updated_at: string;
  menus?: MenuSummary[];
}

export interface MenuSummary {
  id: number;
  name: string;
  image_url?: string;
}

export interface ShopInput {
  name: string;
  address: string;
  google_map_url: string;
}