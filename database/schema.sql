-- Database Schema for Menufy Restaurant Management System

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Restaurants table
CREATE TABLE restaurants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  logo_url TEXT,
  banner_url TEXT,
  color_scheme VARCHAR(7) DEFAULT '#ea580c', -- Orange color
  is_active BOOLEAN DEFAULT true,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu categories table
CREATE TABLE menu_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu items table
CREATE TABLE menu_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_veg BOOLEAN DEFAULT true,
  is_spicy BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_restaurants_slug ON restaurants(slug);
CREATE INDEX idx_restaurants_owner ON restaurants(owner_id);
CREATE INDEX idx_menu_categories_restaurant ON menu_categories(restaurant_id);
CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_menu_items_category ON menu_items(category_id);

-- Row Level Security (RLS) policies
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Restaurants policies
CREATE POLICY "Restaurants are viewable by everyone" ON restaurants
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can insert their own restaurants" ON restaurants
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own restaurants" ON restaurants
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own restaurants" ON restaurants
  FOR DELETE USING (auth.uid() = owner_id);

-- Menu categories policies
CREATE POLICY "Menu categories are viewable for active restaurants" ON menu_categories
  FOR SELECT USING (
    is_active = true AND 
    restaurant_id IN (SELECT id FROM restaurants WHERE is_active = true)
  );

CREATE POLICY "Users can manage categories for their restaurants" ON menu_categories
  FOR ALL USING (
    restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid())
  );

-- Menu items policies
CREATE POLICY "Menu items are viewable for active restaurants" ON menu_items
  FOR SELECT USING (
    is_available = true AND 
    restaurant_id IN (SELECT id FROM restaurants WHERE is_active = true)
  );

CREATE POLICY "Users can manage items for their restaurants" ON menu_items
  FOR ALL USING (
    restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid())
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON restaurants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_categories_updated_at BEFORE UPDATE ON menu_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample demo restaurant
INSERT INTO restaurants (
  id,
  name,
  slug,
  description,
  phone,
  email,
  address,
  owner_id
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Spice Garden Restaurant',
  'demo',
  'Authentic Kerala cuisine with modern twists',
  '+91 7025297658',
  'info@spicegarden.com',
  'MG Road, Kochi, Kerala 682001',
  '00000000-0000-0000-0000-000000000001'
);

-- Insert sample categories for demo restaurant
INSERT INTO menu_categories (id, restaurant_id, name, description, display_order) VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Appetizers', 'Start your meal with these delicious appetizers', 1),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Main Course', 'Our signature main dishes', 2),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Biryani & Rice', 'Fragrant rice dishes and biryanis', 3),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'Beverages', 'Refreshing drinks and beverages', 4),
  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 'Desserts', 'Sweet endings to your meal', 5);

-- Insert sample menu items for demo restaurant
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, is_veg, is_spicy, is_featured, display_order) VALUES
-- Appetizers
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Kerala Fish Fry', 'Crispy marinated fish in traditional Kerala spices', 285.00, false, true, true, 1),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Banana Chips', 'Crispy banana chips with a hint of salt', 85.00, true, false, false, 2),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Chicken 65', 'Spicy deep-fried chicken appetizer', 245.00, false, true, false, 3),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Prawn Koliwada', 'Crispy fried prawns with curry leaves', 325.00, false, true, false, 4),

-- Main Course
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'Fish Curry Kerala Style', 'Traditional Kerala fish curry with coconut milk', 385.00, false, true, true, 1),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'Chicken Stew', 'Mild coconut-based chicken curry', 345.00, false, false, false, 2),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'Beef Roast', 'Spicy Kerala-style beef roast', 425.00, false, true, true, 3),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'Vegetable Stew', 'Mixed vegetables in coconut milk', 285.00, true, false, false, 4),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'Malabar Chicken', 'Rich and creamy chicken curry from Malabar', 365.00, false, true, false, 5),

-- Biryani & Rice
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 'Chicken Biryani', 'Fragrant basmati rice with tender chicken', 385.00, false, true, true, 1),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 'Mutton Biryani', 'Aromatic rice with succulent mutton pieces', 445.00, false, true, false, 2),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 'Vegetable Biryani', 'Colorful mixed vegetable biryani', 285.00, true, false, false, 3),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 'Ghee Rice', 'Fragrant rice cooked in pure ghee', 145.00, true, false, false, 4),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 'Coconut Rice', 'Traditional Kerala coconut rice', 165.00, true, false, false, 5),

-- Beverages
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000004', 'Fresh Lime Soda', 'Refreshing lime drink with soda', 85.00, true, false, false, 1),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000004', 'Coconut Water', 'Fresh tender coconut water', 95.00, true, false, true, 2),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000004', 'Mango Lassi', 'Creamy yogurt-based mango drink', 125.00, true, false, false, 3),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000004', 'Filter Coffee', 'Traditional South Indian filter coffee', 65.00, true, false, false, 4),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000004', 'Masala Chai', 'Spiced Indian tea', 45.00, true, false, false, 5),

-- Desserts
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000005', 'Payasam', 'Traditional Kerala rice pudding', 125.00, true, false, true, 1),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000005', 'Kulfi', 'Indian ice cream with cardamom', 95.00, true, false, false, 2),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000005', 'Banana Halwa', 'Sweet banana dessert', 105.00, true, false, false, 3),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000005', 'Coconut Burfi', 'Sweet coconut squares', 85.00, true, false, false, 4); 