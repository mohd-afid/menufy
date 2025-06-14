"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSafeSupabaseClient } from '@/lib/supabase';
import Link from 'next/link';

// Disable static generation for this page
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if Supabase is configured
  const supabase = createSafeSupabaseClient();
  const isSupabaseConfigured = supabase !== null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Use the Demo Dashboard button above or follow the setup guide.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setError(error.message);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setLoading(false);
      setError('Failed to connect to authentication service. Please check your setup.');
    }
  };

  const handleDemoLogin = () => {
    // Temporary demo login bypass
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/signup" className="font-medium text-orange-600 hover:text-orange-500">
              create a new account
            </Link>
          </p>
        </div>

        {/* Demo Login Button - More Prominent */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="text-center">
            <div className="text-2xl mb-2">🚀</div>
            <p className="text-lg font-semibold text-blue-800 mb-2">
              Quick Demo Access
            </p>
            <p className="text-sm text-blue-700 mb-4">
              Test the dashboard without Supabase setup
            </p>
            <button
              onClick={handleDemoLogin}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-semibold text-lg shadow-md"
            >
              Enter Demo Dashboard
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">Or sign in with credentials</span>
          </div>
        </div>

        {!isSupabaseConfigured && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="text-center text-yellow-800">
              <strong>⚠️ Supabase Not Configured</strong>
              <br />
              <span className="text-sm">The form below won't work until you set up Supabase credentials.</span>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={!isSupabaseConfigured}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm ${!isSupabaseConfigured ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={!isSupabaseConfigured}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm ${!isSupabaseConfigured ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
              {error.includes('Supabase is not configured') && (
                <div className="mt-2">
                  <Link 
                    href="https://github.com/yourusername/menufy/blob/main/SETUP.md" 
                    target="_blank"
                    className="text-sm text-red-600 hover:text-red-800 underline"
                  >
                    View Setup Guide →
                  </Link>
                </div>
              )}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !isSupabaseConfigured}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : isSupabaseConfigured ? 'Sign in' : 'Sign in (Supabase Required)'}
            </button>
          </div>

          <div className="text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
              ← Back to home
            </Link>
          </div>
        </form>

        {/* Setup Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <div className="text-sm text-blue-700">
            <strong>First time setup?</strong> You need to configure Supabase authentication to use real login functionality. 
            <br />
            <Link 
              href="https://github.com/yourusername/menufy/blob/main/SETUP.md"
              target="_blank" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Check the setup guide
            </Link> for instructions.
          </div>
        </div>
      </div>
    </div>
  );
} 