'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaQrcode, FaChartBar } from 'react-icons/fa';
import type { Restaurant } from '@/types/restaurant';

export default function DashboardPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      // This would get the current user's restaurants
      // For now, we'll just simulate loading
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setLoading(false);
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
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Restaurant Dashboard</h1>
        <p className="text-lg opacity-90">Manage your digital menus and QR codes effortlessly</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Restaurants</h3>
          <p className="text-3xl font-bold text-orange-600">{restaurants.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Menu Items</h3>
          <p className="text-3xl font-bold text-green-600">24</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">QR Code Scans</h3>
          <p className="text-3xl font-bold text-blue-600">156</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Categories</h3>
          <p className="text-3xl font-bold text-purple-600">8</p>
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
                  onDelete={() => {/* Handle delete */}}
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
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition flex items-center space-x-3">
              <FaPlus className="text-orange-500" />
              <span>Add Menu Category</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition flex items-center space-x-3">
              <FaEdit className="text-blue-500" />
              <span>Add Menu Item</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition flex items-center space-x-3">
              <FaQrcode className="text-green-500" />
              <span>Generate QR Code</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Analytics Preview</h3>
          <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaChartBar className="text-4xl text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Analytics coming soon</p>
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
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
        <p className="text-gray-600 mb-4 text-sm">{restaurant.description}</p>
        
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
        alert('Error creating restaurant');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating restaurant');
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Restaurant</h2>
          
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
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                Create Restaurant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}