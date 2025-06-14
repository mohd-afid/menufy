"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

# Menufy - QR Menu Restaurant Management System

A modern, full-stack restaurant management system that allows restaurant owners to create, manage, and display digital menus through QR codes. Built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Features

### 🎯 Core Features
- **Dynamic Restaurant Menus**: Create and manage multiple restaurants with custom menus
- **QR Code Integration**: Generate QR codes for contactless menu access
- **Modern UI/UX**: Beautiful, responsive design with mobile-first approach
- **Real-time Menu Management**: Add, edit, and delete menu items instantly
- **Category Organization**: Organize menu items into categories
- **Smart Cart System**: Add to cart functionality with quantity controls
- **Search & Filter**: Search menu items across categories

### 🏪 Restaurant Management
- **Restaurant Dashboard**: Comprehensive dashboard for restaurant owners
- **Menu Categories**: Create and organize menu categories
- **Menu Items**: Add items with descriptions, prices, dietary information
- **Dynamic Routing**: Each restaurant gets a unique URL (`/menu/restaurant-slug`)
- **Responsive Design**: Works perfectly on all devices

### 🔐 Authentication & Security
- **Supabase Authentication**: Secure user management
- **Row Level Security**: Data protection at database level
- **Owner Permissions**: Restaurant owners can only manage their own data

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: React Icons (Font Awesome)
- **Image Optimization**: Next.js Image component

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/menufy.git
cd menufy
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your keys
3. Copy the SQL from `database/schema.sql` and run it in your Supabase SQL editor

### 4. Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── restaurants/   # Restaurant CRUD operations
│   │   ├── menu-categories/ # Category management
│   │   └── menu-items/    # Menu item management
│   ├── menu/[slug]/       # Dynamic restaurant menu pages
│   ├── dashboard/         # Restaurant management dashboard
│   └── page.tsx          # Landing page
├── components/            # Reusable components
├── lib/                  # Utility functions and configurations
│   └── supabase.ts      # Supabase client setup
└── types/                # TypeScript type definitions
    └── restaurant.ts    # Restaurant-related types
```

## Database Schema

### Tables
- **restaurants**: Restaurant information and settings
- **menu_categories**: Menu category organization
- **menu_items**: Individual menu items with pricing and details

### Key Features
- UUID primary keys for security
- Row Level Security (RLS) policies
- Automatic timestamp updates
- Optimized indexes for performance

## API Endpoints

### Restaurants
- `GET /api/restaurants` - List restaurants
- `POST /api/restaurants` - Create restaurant
- `GET /api/restaurants/[slug]/menu` - Get complete restaurant menu

### Menu Categories
- `GET /api/menu-categories?restaurant_id=` - List categories
- `POST /api/menu-categories` - Create category

### Menu Items
- `GET /api/menu-items?restaurant_id=` - List items
- `POST /api/menu-items` - Create menu item

## Usage

### For Restaurant Owners

1. **Create Account**: Sign up through the authentication system
2. **Access Dashboard**: Go to `/dashboard` to manage restaurants
3. **Add Restaurant**: Create a new restaurant with basic information
4. **Manage Menu**: Add categories and menu items
5. **Share QR Code**: Generate and print QR codes for tables

### For Customers

1. **Scan QR Code**: Use phone camera to scan restaurant QR code
2. **Browse Menu**: Navigate through categories and items
3. **Add to Cart**: Select items and quantities
4. **Place Order**: Review and place order (integration pending)

## Demo

Visit the demo restaurant at [/menu/demo](http://localhost:3000/menu/demo) to see the system in action.

The demo includes:
- **Spice Garden Restaurant**: Sample Kerala cuisine restaurant
- **Multiple Categories**: Appetizers, Main Course, Biryani & Rice, Beverages, Desserts
- **25+ Menu Items**: Complete menu with pricing and descriptions
- **Interactive Features**: Search, cart functionality, responsive design

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js applications.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@menufy.com or create an issue in the repository.

## Roadmap

- [ ] Payment integration
- [ ] Order management system
- [ ] Customer feedback system
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Inventory management
- [ ] Staff management
- [ ] Delivery integration

---

Made with ❤️ for Kerala restaurants and beyond!
