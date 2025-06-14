export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  logo_url?: string;
  banner_url?: string;
  color_scheme: string;
  is_active: boolean;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface MenuCategory {
  id: string;
  restaurant_id: string;
  name: string;
  description?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  category_id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  is_veg: boolean;
  is_spicy: boolean;
  is_featured: boolean;
  is_available: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface MenuCategoryWithItems extends MenuCategory {
  items: MenuItem[];
}

export interface RestaurantWithMenu extends Restaurant {
  categories: MenuCategoryWithItems[];
}

// Form types for creating/updating
export interface CreateRestaurantForm {
  name: string;
  slug: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  color_scheme?: string;
}

export interface CreateMenuCategoryForm {
  restaurant_id: string;
  name: string;
  description?: string;
  display_order?: number;
}

export interface CreateMenuItemForm {
  restaurant_id: string;
  category_id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  is_veg?: boolean;
  is_spicy?: boolean;
  is_featured?: boolean;
  display_order?: number;
} 