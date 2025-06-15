import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  let supabaseConfigured = true;

  try {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();
    session = data.session;
  } catch (error) {
    console.log('Supabase not configured, allowing demo access');
    supabaseConfigured = false;
  }

  // Only redirect if Supabase is configured but no session exists
  // For demo mode, always allow access
  if (supabaseConfigured && !session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {!supabaseConfigured && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-yellow-800">
                  <strong>Demo Mode:</strong> Supabase is not configured. Some features may not work.{' '}
                  <a 
                    href="https://github.com/yourusername/menufy/blob/main/SETUP.md" 
                    target="_blank"
                    className="underline hover:text-yellow-900"
                  >
                    Setup Guide →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-kerala-green dark:text-kerala-yellow">
                  Menufy
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-800">
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}