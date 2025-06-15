import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if we have real environment variables
const hasValidConfig = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Safe client creation for client components
export const createSafeSupabaseClient = () => {
  try {
    if (!hasValidConfig) {
      console.warn('⚠️ Supabase environment variables not configured. Please set up your .env.local file with actual Supabase credentials.');
      return null;
    }
    return createClientComponentClient();
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    return null;
  }
};

// Demo mode storage functions
export class DemoStorage {
  private static getFromStorage<T>(key: string): T[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private static saveToStorage<T>(key: string, data: T[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  // Restaurant operations
  static getRestaurants() {
    return this.getFromStorage<any>('menufy_restaurants');
  }

  static addRestaurant(restaurant: any) {
    const restaurants = this.getRestaurants();
    const newRestaurant = {
      ...restaurant,
      id: Date.now().toString(),
      owner_id: 'demo-user',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      color_scheme: restaurant.color_scheme || '#ea580c'
    };
    restaurants.push(newRestaurant);
    this.saveToStorage('menufy_restaurants', restaurants);
    return newRestaurant;
  }

  static updateRestaurant(id: string, updates: any) {
    const restaurants = this.getRestaurants();
    const index = restaurants.findIndex(r => r.id === id);
    if (index !== -1) {
      restaurants[index] = { ...restaurants[index], ...updates, updated_at: new Date().toISOString() };
      this.saveToStorage('menufy_restaurants', restaurants);
      return restaurants[index];
    }
    return null;
  }

  static deleteRestaurant(id: string) {
    const restaurants = this.getRestaurants();
    const filtered = restaurants.filter(r => r.id !== id);
    this.saveToStorage('menufy_restaurants', filtered);
    return true;
  }

  // Menu category operations
  static getMenuCategories(restaurantId: string) {
    return this.getFromStorage<any>('menufy_categories').filter(c => c.restaurant_id === restaurantId);
  }

  static addMenuCategory(category: any) {
    const categories = this.getFromStorage<any>('menufy_categories');
    const newCategory = {
      ...category,
      id: Date.now().toString(),
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      display_order: category.display_order || 0
    };
    categories.push(newCategory);
    this.saveToStorage('menufy_categories', categories);
    return newCategory;
  }

  // Menu item operations
  static getMenuItems(restaurantId: string) {
    return this.getFromStorage<any>('menufy_items').filter(i => i.restaurant_id === restaurantId);
  }

  static addMenuItem(item: any) {
    const items = this.getFromStorage<any>('menufy_items');
    const newItem = {
      ...item,
      id: Date.now().toString(),
      is_available: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      display_order: item.display_order || 0,
      is_veg: item.is_veg || false,
      is_spicy: item.is_spicy || false,
      is_featured: item.is_featured || false
    };
    items.push(newItem);
    this.saveToStorage('menufy_items', items);
    return newItem;
  }

  // Initialize demo data
  static initializeDemoData() {
    if (typeof window === 'undefined') return;
    
    const restaurants = this.getRestaurants();
    if (restaurants.length === 0) {
      // Add demo restaurant
      const demoRestaurant = this.addRestaurant({
        name: 'Spice Garden Restaurant',
        slug: 'spice-garden',
        description: 'Authentic Kerala cuisine with traditional flavors',
        phone: '+91 9876543210',
        email: 'info@spicegarden.com',
        address: '123 MG Road, Kochi, Kerala 682001'
      });

      // Add demo categories
      const categories = [
        { name: 'Appetizers', description: 'Start your meal right' },
        { name: 'Main Course', description: 'Traditional Kerala dishes' },
        { name: 'Beverages', description: 'Refreshing drinks' },
        { name: 'Desserts', description: 'Sweet endings' }
      ];

      categories.forEach((cat, index) => {
        const category = this.addMenuCategory({
          restaurant_id: demoRestaurant.id,
          name: cat.name,
          description: cat.description,
          display_order: index
        });

        // Add demo items for each category
        const items = this.getDemoItemsForCategory(cat.name);
        items.forEach((item: any, itemIndex: number) => {
          this.addMenuItem({
            restaurant_id: demoRestaurant.id,
            category_id: category.id,
            name: item.name,
            description: item.description,
            price: item.price,
            is_veg: item.is_veg,
            is_spicy: item.is_spicy,
            is_featured: item.is_featured,
            display_order: itemIndex
          });
        });
      });
    }
  }

  private static getDemoItemsForCategory(categoryName: string) {
    const items: any = {
      'Appetizers': [
        { name: 'Prawn Koliwada', description: 'Crispy fried prawns with spices', price: 280, is_veg: false, is_spicy: true, is_featured: true },
        { name: 'Chicken 65', description: 'Spicy deep-fried chicken', price: 250, is_veg: false, is_spicy: true, is_featured: false },
        { name: 'Banana Chips', description: 'Crispy Kerala banana chips', price: 80, is_veg: true, is_spicy: false, is_featured: false }
      ],
      'Main Course': [
        { name: 'Fish Curry', description: 'Traditional Kerala fish curry with coconut', price: 350, is_veg: false, is_spicy: true, is_featured: true },
        { name: 'Chicken Stew', description: 'Mild coconut chicken curry', price: 320, is_veg: false, is_spicy: false, is_featured: true },
        { name: 'Vegetable Korma', description: 'Mixed vegetables in coconut gravy', price: 280, is_veg: true, is_spicy: false, is_featured: false },
        { name: 'Appam with Stew', description: 'Soft appam with vegetable stew', price: 180, is_veg: true, is_spicy: false, is_featured: false }
      ],
      'Beverages': [
        { name: 'Fresh Lime Soda', description: 'Refreshing lime with soda', price: 60, is_veg: true, is_spicy: false, is_featured: false },
        { name: 'Coconut Water', description: 'Fresh tender coconut water', price: 80, is_veg: true, is_spicy: false, is_featured: true },
        { name: 'Masala Chai', description: 'Traditional spiced tea', price: 40, is_veg: true, is_spicy: false, is_featured: false }
      ],
      'Desserts': [
        { name: 'Payasam', description: 'Traditional Kerala sweet pudding', price: 120, is_veg: true, is_spicy: false, is_featured: true },
        { name: 'Banana Halwa', description: 'Sweet banana dessert', price: 100, is_veg: true, is_spicy: false, is_featured: false }
      ]
    };
    return items[categoryName] || [];
  }
}

// Check if we're in demo mode
export const isDemoMode = () => {
  // Check if we have placeholder config
  if (!hasValidConfig) return true;
  
  // Check if we're in development and Supabase URL contains the problematic domain
  if (typeof window !== 'undefined' && supabaseUrl.includes('dczuhijxhjkzlzmtzbyc')) {
    console.warn('⚠️ Detected non-working Supabase URL, switching to demo mode');
    return true;
  }
  
  return false;
};