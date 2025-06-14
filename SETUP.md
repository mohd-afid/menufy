# Menufy Setup Guide

## Setting up Supabase Authentication

The login functionality requires proper Supabase configuration. Follow these steps:

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - Name: `menufy` (or any name you prefer)
   - Database Password: Create a strong password
   - Region: Choose closest to your location
6. Click "Create new project"
7. Wait for the project to be created (this takes a few minutes)

### 2. Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (under "Project API keys")

### 3. Configure Environment Variables

1. Create a file named `.env.local` in your project root directory
2. Add the following content, replacing the placeholder values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: 
- Replace `your-project-ref` with your actual project reference from step 2
- Replace `your-anon-key-here` with your actual anon public key from step 2
- The `.env.local` file should not be committed to version control (it's already in .gitignore)

### 4. Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents from `database/schema.sql` in this project
3. Paste it into the SQL Editor and run it
4. This will create the necessary tables and sample data

### 5. Restart Development Server

After setting up the environment variables:

```bash
npm run dev
```

The application should now connect to your Supabase database and authentication should work.

## Troubleshooting

### "Failed to fetch" or "ERR_NAME_NOT_RESOLVED" errors

This means the environment variables are not set up correctly. Check that:

1. Your `.env.local` file exists in the project root
2. The Supabase URL and key are correct (no placeholder values)
3. You've restarted the development server after creating/updating `.env.local`

### "Multiple GoTrueClient instances detected"

This warning can be safely ignored during development. It occurs when the development server hot-reloads.

### Authentication not working

1. Verify your Supabase project is active and running
2. Check that Row Level Security (RLS) is properly configured
3. Ensure the database schema is set up correctly

## Demo Access

If you want to quickly test the application without setting up Supabase:

1. Visit the demo menu at `/menu/demo`
2. The landing page and menu functionality will work
3. Only the authentication and dashboard features require Supabase setup

## Need Help?

If you're still having issues:

1. Check the browser console for specific error messages
2. Verify your Supabase project settings
3. Ensure all environment variables are correctly configured
4. Try creating a fresh Supabase project if problems persist 