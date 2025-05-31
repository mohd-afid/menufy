"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

# Menufy - Smart QR Menu for Kerala Restaurants

A modern, contactless digital menu platform built with Next.js 15, TypeScript, and Supabase. Designed specifically for Kerala restaurants with Malayalam language support.

## 🚀 Features

- **QR Code Menus**: Generate downloadable QR codes for contactless menu access
- **Malayalam Support**: Bilingual menu items with Malayalam translations
- **Restaurant Dashboard**: Manage menu items, categories, and QR codes
- **Mobile Optimized**: Responsive design for all devices
- **Real-time Updates**: Instant menu updates across all QR codes
- **Image Upload**: Support for menu item images
- **Search & Filter**: Easy menu navigation for customers

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **UI Components**: React 19, React Icons
- **QR Generation**: qrcode.react
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
menufy/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Protected routes
│   │   │   └── dashboard/     # Dashboard pages
│   │   ├── login/             # Authentication
│   │   ├── signup/            # User registration
│   │   └── menu/              # Public menu pages
│   ├── components/            # Reusable components
│   │   └── dashboard/         # Dashboard components
│   ├── lib/                   # Utilities & configurations
│   └── types/                 # TypeScript definitions
├── public/                    # Static assets
└── ...config files
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/mohd-afid/menufy.git
cd menufy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Supabase Database

Create the following tables in your Supabase database:

```sql
-- Restaurants table
CREATE TABLE restaurants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT,
  contact TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_ml TEXT, -- Malayalam name
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu Items table
CREATE TABLE menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_ml TEXT, -- Malayalam name
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  description TEXT,
  description_ml TEXT, -- Malayalam description
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. Set Up Storage Bucket

In Supabase Storage, create a bucket named `menu-images` for storing menu item images.

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**: Make sure your code is pushed to a GitHub repository.

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect it's a Next.js project

3. **Set Environment Variables**:
   In your Vercel project settings, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Deploy**: Vercel will automatically build and deploy your application.

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Custom Colors (Kerala Theme)

The app uses a Kerala-inspired color palette defined in `tailwind.config.ts`:

```typescript
colors: {
  'kerala-green': '#228B22',
  'kerala-orange': '#FF6347', 
  'kerala-yellow': '#FFD700',
}
```

### Image Domains

Update `next.config.ts` to add allowed image domains:

```typescript
images: {
  domains: ['your-domain.com', 'supabase-storage-url'],
}
```

## 📱 Usage

### For Restaurant Owners

1. **Sign Up**: Create an account at `/signup`
2. **Dashboard**: Access your dashboard at `/dashboard`
3. **Add Categories**: Organize your menu into categories
4. **Add Menu Items**: Upload items with images, prices, and descriptions
5. **Generate QR**: Download your restaurant's QR code
6. **Print & Display**: Place QR codes on tables

### For Customers

1. **Scan QR Code**: Use phone camera to scan the QR code
2. **Browse Menu**: View categorized menu items with images
3. **Search**: Find specific items quickly
4. **Add to Cart**: Select items (if ordering is enabled)

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Structure

- **Pages**: Located in `src/app/` using Next.js App Router
- **Components**: Reusable UI components in `src/components/`
- **Types**: TypeScript definitions in `src/types/`
- **Utilities**: Helper functions in `src/lib/`

## 🔒 Authentication & Security

- User authentication handled by Supabase Auth
- Row Level Security (RLS) policies recommended for production
- Environment variables for sensitive configuration
- HTTPS enforced in production

## 🌐 Internationalization

The app supports Malayalam language for menu items:
- `name` and `name_ml` for item names
- `description` and `description_ml` for descriptions
- Easily extendable for other languages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@menufy.com
- Documentation: [docs.menufy.com](https://docs.menufy.com)

## 🚀 Roadmap

- [ ] Online ordering integration
- [ ] Payment gateway integration
- [ ] Analytics dashboard
- [ ] Multi-restaurant support
- [ ] Mobile app
- [ ] WhatsApp integration
- [ ] Voice ordering support

---

**Made with ❤️ for Kerala restaurants**
