import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Safe client creation for client components
export const createSafeSupabaseClient = () => {
  try {
    // Check if we have real environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase environment variables not found');
      return null;
    }
    return createClientComponentClient();
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    return null;
  }
};