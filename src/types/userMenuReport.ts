export interface UserMenuReport {
  id: number;
  created_at: string;
  image_urls: string[];
  user: {
    id: number;
    name: string;
    email: string;
  };
  menu: {
    id: number;
    name: string;
    shop: {
      id: number;
      name: string;
    };
    reviews: {
      id: number;
      rating: number;
      comment: string;
      visited_at: string;
    }[];
  };
  genre: {
    id: number;
    name: string;
  };
  noodle: {
    id: number;
    name: string;
  };
  soup: {
    id: number;
    name: string;
  };
}
