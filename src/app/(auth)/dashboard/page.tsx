import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import CategoryManager from '@/components/dashboard/CategoryManager';
import MenuItemManager from '@/components/dashboard/MenuItemManager';
import QRCodeGenerator from '@/components/dashboard/QRCodeGenerator';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: { session } } = await supabase.auth.getSession();
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('user_id', session?.user?.id)
    .single();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-kerala-green text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Restaurant Dashboard</h1>
        <p className="text-lg opacity-90">Manage your digital menu and QR codes effortlessly</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Menu Items</h3>
          <p className="text-3xl font-bold text-kerala-green">24</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">QR Code Scans</h3>
          <p className="text-3xl font-bold text-kerala-orange">156</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Categories</h3>
          <p className="text-3xl font-bold text-kerala-yellow">8</p>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Code Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your QR Code</h2>
          <div className="flex flex-col items-center space-y-4">
            <QRCodeGenerator restaurantId={restaurant?.id} />
            <p className="text-sm text-gray-600 text-center mt-4">
              Download your QR code and place it on your restaurant tables
            </p>
          </div>
        </div>

        {/* Restaurant Profile */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Restaurant Profile</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div>
                <h3 className="text-xl font-semibold">{restaurant?.name}</h3>
                <p className="text-gray-600">{restaurant?.contact}</p>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-kerala-green text-white rounded-lg hover:bg-opacity-90 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Menu Management */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Menu Management</h2>
          <div className="space-y-6">
            <CategoryManager />
            <MenuItemManager />
          </div>
        </div>
      </div>

      {/* Analytics Preview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Analytics Overview</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Analytics visualization will appear here</p>
        </div>
      </div>
    </div>
  );
}