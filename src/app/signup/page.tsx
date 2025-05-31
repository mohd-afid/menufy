"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSafeSupabaseClient } from '@/lib/supabase';

// Disable static generation for this page
export const dynamic = 'force-dynamic';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const supabase = createSafeSupabaseClient();
    if (!supabase) {
      setError('Failed to initialize authentication');
      setLoading(false);
      return;
    }
    
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <div className="text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-purple-500 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
} 