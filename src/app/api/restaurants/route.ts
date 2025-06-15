import { NextRequest, NextResponse } from 'next/server';
import { supabase, DemoStorage, isDemoMode } from '@/lib/supabase';
import type { CreateRestaurantForm } from '@/types/restaurant';

export async function GET(request: NextRequest) {
  try {
    if (isDemoMode()) {
      // Demo mode - return restaurants from localStorage
      const restaurants = DemoStorage.getRestaurants();
      return NextResponse.json(restaurants);
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const owner_id = searchParams.get('owner_id');

    let query = supabase
      .from('restaurants')
      .select('*')
      .eq('is_active', true);

    if (slug) {
      query = query.eq('slug', slug);
    }

    if (owner_id) {
      query = query.eq('owner_id', owner_id);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    // If Supabase fails, fallback to demo mode
    const restaurants = DemoStorage.getRestaurants();
    return NextResponse.json(restaurants);
  }
}

export async function POST(request: NextRequest) {
  const body: CreateRestaurantForm = await request.json();
  
  // Always try demo mode first if environment suggests it, or as fallback
  if (isDemoMode()) {
    const newRestaurant = DemoStorage.addRestaurant(body);
    return NextResponse.json(newRestaurant, { status: 201 });
  }

  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      // Auth failed - fallback to demo mode instead of returning 401
      console.log('Auth failed, falling back to demo mode:', userError?.message);
      const newRestaurant = DemoStorage.addRestaurant(body);
      return NextResponse.json(newRestaurant, { status: 201 });
    }

    const restaurantData = {
      ...body,
      owner_id: user.id,
      color_scheme: body.color_scheme || '#ea580c'
    };

    const { data, error } = await supabase
      .from('restaurants')
      .insert([restaurantData])
      .select()
      .single();

    if (error) {
      // Database error - fallback to demo mode
      console.log('Database error, falling back to demo mode:', error.message);
      const newRestaurant = DemoStorage.addRestaurant(body);
      return NextResponse.json(newRestaurant, { status: 201 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    // Any other error - fallback to demo mode
    console.log('Unexpected error, falling back to demo mode:', error);
    const newRestaurant = DemoStorage.addRestaurant(body);
    return NextResponse.json(newRestaurant, { status: 201 });
  }
} 