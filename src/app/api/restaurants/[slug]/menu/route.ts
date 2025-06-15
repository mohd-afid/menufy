import { NextRequest, NextResponse } from 'next/server';
import { supabase, DemoStorage, isDemoMode } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (isDemoMode()) {
      // Demo mode - get from localStorage
      const restaurants = DemoStorage.getRestaurants();
      const restaurant = restaurants.find(r => r.slug === slug && r.is_active);
      
      if (!restaurant) {
        return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
      }

      // Get menu categories
      const categories = DemoStorage.getMenuCategories(restaurant.id);

      // Get menu items
      const menuItems = DemoStorage.getMenuItems(restaurant.id);

      // Group items by category
      const categoriesWithItems = categories.map(category => ({
        ...category,
        items: menuItems.filter(item => item.category_id === category.id)
      }));

      const restaurantWithMenu = {
        ...restaurant,
        categories: categoriesWithItems
      };

      return NextResponse.json(restaurantWithMenu);
    }

    // First get the restaurant
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (restaurantError || !restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }

    // Get menu categories
    const { data: categories, error: categoriesError } = await supabase
      .from('menu_categories')
      .select('*')
      .eq('restaurant_id', restaurant.id)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (categoriesError) {
      return NextResponse.json({ error: categoriesError.message }, { status: 500 });
    }

    // Get menu items for each category
    const { data: menuItems, error: itemsError } = await supabase
      .from('menu_items')
      .select('*')
      .eq('restaurant_id', restaurant.id)
      .eq('is_available', true)
      .order('display_order', { ascending: true });

    if (itemsError) {
      return NextResponse.json({ error: itemsError.message }, { status: 500 });
    }

    // Group items by category
    const categoriesWithItems = categories.map(category => ({
      ...category,
      items: menuItems.filter(item => item.category_id === category.id)
    }));

    const restaurantWithMenu = {
      ...restaurant,
      categories: categoriesWithItems
    };

    return NextResponse.json(restaurantWithMenu);
  } catch (error) {
    // If Supabase fails, try demo mode fallback
    try {
      const { slug } = await params;
      const restaurants = DemoStorage.getRestaurants();
      const restaurant = restaurants.find(r => r.slug === slug && r.is_active);
      
      if (!restaurant) {
        return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
      }

      const categories = DemoStorage.getMenuCategories(restaurant.id);
      const menuItems = DemoStorage.getMenuItems(restaurant.id);

      const categoriesWithItems = categories.map(category => ({
        ...category,
        items: menuItems.filter(item => item.category_id === category.id)
      }));

      const restaurantWithMenu = {
        ...restaurant,
        categories: categoriesWithItems
      };

      return NextResponse.json(restaurantWithMenu);
    } catch (fallbackError) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
} 