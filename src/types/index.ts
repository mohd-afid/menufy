export interface Restaurant {
  id: string;
  name: string;
  logo?: string;
  contact: string;
}

export interface Category {
  id: string;
  restaurant_id: string;
  name: string;
  name_ml?: string; // Malayalam name
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  name_ml?: string; // Malayalam name
  price: number;
  image_url?: string;
  description?: string;
  description_ml?: string; // Malayalam description
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'restaurant_owner';
  restaurant_id?: string;
}