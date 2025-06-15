'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaEdit, FaTrash, FaEye, FaQrcode, FaChartBar } from 'react-icons/fa';
import type { Restaurant } from '@/types/restaurant';
import { DemoStorage, isDemoMode } from '@/lib/supabase';

export default function DashboardPage() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    // Initialize demo data if in demo mode
    if (isDemoMode()) {
      DemoStorage.initializeDemoData();
    }
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      if (isDemoMode()) {
        // Demo mode - get from localStorage
        const demoRestaurants = DemoStorage.getRestaurants();
        setRestaurants(demoRestaurants);
        setLoading(false);
        return;
      }

      // Normal mode - fetch from API
      const response = await fetch('/api/restaurants');
      if (response.ok) {
        const data = await response.json();
        setRestaurants(data);
      } else {
        console.error('Failed to fetch restaurants');
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      // Fallback to demo mode if API fails
      const demoRestaurants = DemoStorage.getRestaurants();
      setRestaurants(demoRestaurants);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRestaurant = (restaurantId: string) => {
    if (isDemoMode()) {
      DemoStorage.deleteRestaurant(restaurantId);
      fetchRestaurants();
    } else {
      // Handle Supabase delete
      console.log('Delete restaurant:', restaurantId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Demo Mode Notice */}
      {isDemoMode() && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🚀</div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Demo Mode Active</h3>
              <p className="text-sm text-blue-700">
                You're using local storage. Data will persist until you clear browser storage.
                <br />
                <a href="https://github.com/yourusername/menufy/blob/main/SETUP.md" target="_blank" className="underline hover:text-blue-800">
                  Set up Supabase for full functionality →
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Restaurant Dashboard</h1>
        <p className="text-lg opacity-90">
          {isDemoMode() ? 'Demo Mode: ' : ''}
          Manage your digital menus and QR codes effortlessly
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Restaurants</h3>
          <p className="text-3xl font-bold text-orange-600">{restaurants.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Menu Items</h3>
          <p className="text-3xl font-bold text-green-600">
            {restaurants.reduce((total, restaurant) => {
              const items = isDemoMode() ? DemoStorage.getMenuItems(restaurant.id) : [];
              return total + items.length;
            }, 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">QR Code Scans</h3>
          <p className="text-3xl font-bold text-blue-600">
            {isDemoMode() ? Math.floor(Math.random() * 500) + 100 : 156}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Categories</h3>
          <p className="text-3xl font-bold text-purple-600">
            {restaurants.reduce((total, restaurant) => {
              const categories = isDemoMode() ? DemoStorage.getMenuCategories(restaurant.id) : [];
              return total + categories.length;
            }, 0)}
          </p>
        </div>
      </div>

      {/* Restaurants Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Your Restaurants</h2>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition flex items-center space-x-2"
            >
              <FaPlus />
              <span>Add Restaurant</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {restaurants.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-4">No Restaurants Yet</h3>
                <p className="text-gray-600 mb-6">
                  Get started by creating your first restaurant and menu.
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
                >
                  Create Your First Restaurant
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onEdit={() => setSelectedRestaurant(restaurant)}
                  onDelete={() => handleDeleteRestaurant(restaurant.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setShowCreateForm(true)}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition flex items-center space-x-3"
            >
              <FaPlus className="text-orange-500" />
              <span>Add Restaurant</span>
            </button>
            <button 
              onClick={() => {
                const firstRestaurant = restaurants[0];
                if (firstRestaurant) {
                  router.push(`/dashboard/menu-management?restaurant=${firstRestaurant.id}`);
                }
              }}
              disabled={restaurants.length === 0}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaEdit className="text-blue-500" />
              <span>Manage Menu</span>
            </button>
            <button 
              disabled={restaurants.length === 0}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaEdit className="text-green-500" />
              <span>Add Menu Item</span>
            </button>
            <button 
              disabled={restaurants.length === 0}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaQrcode className="text-purple-500" />
              <span>Generate QR Code</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Analytics Preview</h3>
          <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaChartBar className="text-4xl text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">
                {isDemoMode() ? 'Demo analytics - random data' : 'Analytics coming soon'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Restaurant Modal */}
      {showCreateForm && (
        <CreateRestaurantModal
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            setShowCreateForm(false);
            fetchRestaurants();
          }}
        />
      )}
    </div>
  );
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onEdit: () => void;
  onDelete: () => void;
}

function RestaurantCard({ restaurant, onEdit, onDelete }: RestaurantCardProps) {
  const menuItemsCount = isDemoMode() ? DemoStorage.getMenuItems(restaurant.id).length : 0;
  const categoriesCount = isDemoMode() ? DemoStorage.getMenuCategories(restaurant.id).length : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Active
          </span>
        </div>
        <p className="text-gray-600 mb-4 text-sm">{restaurant.description}</p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-center">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-lg font-bold text-orange-600">{menuItemsCount}</div>
            <div className="text-xs text-gray-600">Items</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-lg font-bold text-blue-600">{categoriesCount}</div>
            <div className="text-xs text-gray-600">Categories</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => window.open(`/menu/${restaurant.slug}`, '_blank')}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
              title="View Menu"
            >
              <FaEye />
            </button>
            <button
              onClick={() => window.open(`/dashboard/menu-management?restaurant=${restaurant.id}`, '_self')}
              className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition"
              title="Manage Menu"
            >
              <FaEdit />
            </button>
            <button
              onClick={onEdit}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              title="Edit Restaurant"
            >
              <FaEdit />
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
              title="Delete Restaurant"
            >
              <FaTrash />
            </button>
          </div>
          <button
            className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition"
            title="Generate QR Code"
            onClick={() => {
              const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.origin + '/menu/' + restaurant.slug)}`;
              window.open(qrUrl, '_blank');
            }}
          >
            <FaQrcode />
          </button>
        </div>
      </div>
    </div>
  );
}

interface CreateRestaurantModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

function CreateRestaurantModal({ onClose, onSuccess }: CreateRestaurantModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    phone: '',
    email: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error creating restaurant');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error creating restaurant');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Restaurant</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setFormData({
                    ...formData,
                    name,
                    slug: generateSlug(name)
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter restaurant name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="your-restaurant-name"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your menu will be available at: /menu/{formData.slug}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={3}
                placeholder="Brief description of your restaurant"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="restaurant@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={2}
                placeholder="Full address of your restaurant"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.slug}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Restaurant'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}