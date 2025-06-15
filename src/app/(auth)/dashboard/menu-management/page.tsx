'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { DemoStorage, isDemoMode } from '@/lib/supabase';
import type { Restaurant, MenuCategory, MenuItem } from '@/types/restaurant';

export default function MenuManagementPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const restaurantId = searchParams.get('restaurant');

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (!restaurantId) {
      router.push('/dashboard');
      return;
    }
    fetchData();
  }, [restaurantId]);

  const fetchData = async () => {
    try {
      if (isDemoMode()) {
        const restaurants = DemoStorage.getRestaurants();
        const foundRestaurant = restaurants.find(r => r.id === restaurantId);
        if (!foundRestaurant) {
          router.push('/dashboard');
          return;
        }
        setRestaurant(foundRestaurant);
        const demoCategories = DemoStorage.getMenuCategories(restaurantId);
        const demoItems = DemoStorage.getMenuItems(restaurantId);
        setCategories(demoCategories);
        setMenuItems(demoItems);
        if (demoCategories.length > 0) {
          setActiveCategory(demoCategories[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = (categoryData: any) => {
    if (isDemoMode() && restaurantId) {
      const newCategory = DemoStorage.addMenuCategory({
        ...categoryData,
        restaurant_id: restaurantId,
        display_order: categories.length
      });
      setCategories([...categories, newCategory]);
      if (!activeCategory) {
        setActiveCategory(newCategory.id);
      }
    }
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const handleEditCategory = (category: MenuCategory) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category and all its items?')) {
      if (isDemoMode()) {
        // Remove from localStorage
        const allCategories = JSON.parse(localStorage.getItem('menufy_categories') || '[]');
        const allItems = JSON.parse(localStorage.getItem('menufy_items') || '[]');
        
        const filteredCategories = allCategories.filter((c: any) => c.id !== categoryId);
        const filteredItems = allItems.filter((i: any) => i.category_id !== categoryId);
        
        localStorage.setItem('menufy_categories', JSON.stringify(filteredCategories));
        localStorage.setItem('menufy_items', JSON.stringify(filteredItems));

        // Update state
        setCategories(categories.filter(c => c.id !== categoryId));
        setMenuItems(menuItems.filter(item => item.category_id !== categoryId));
        
        if (activeCategory === categoryId && categories.length > 1) {
          const remainingCategories = categories.filter(c => c.id !== categoryId);
          setActiveCategory(remainingCategories[0]?.id || '');
        }
      }
    }
  };

  const handleAddItem = (itemData: any) => {
    if (isDemoMode() && restaurantId) {
      const newItem = DemoStorage.addMenuItem({
        ...itemData,
        restaurant_id: restaurantId,
        category_id: activeCategory,
        display_order: menuItems.filter(item => item.category_id === activeCategory).length
      });
      setMenuItems([...menuItems, newItem]);
    }
    setShowItemForm(false);
    setEditingItem(null);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setShowItemForm(true);
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      if (isDemoMode()) {
        const allItems = JSON.parse(localStorage.getItem('menufy_items') || '[]');
        const filtered = allItems.filter((i: any) => i.id !== itemId);
        localStorage.setItem('menufy_items', JSON.stringify(filtered));
        setMenuItems(menuItems.filter(item => item.id !== itemId));
      }
    }
  };

  const activeCategoryItems = menuItems.filter(item => item.category_id === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Restaurant Not Found</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
              >
                <FaArrowLeft />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Menu Management</h1>
                <p className="text-sm text-gray-500">{restaurant.name}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCategoryForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Category</span>
              </button>
              <button
                onClick={() => setShowItemForm(true)}
                disabled={categories.length === 0}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPlus />
                <span>Add Item</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
              </div>
              <div className="p-2">
                {categories.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm">No categories yet</p>
                    <button
                      onClick={() => setShowCategoryForm(true)}
                      className="mt-2 text-blue-500 hover:text-blue-600 text-sm"
                    >
                      Add your first category
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className={`p-3 rounded-lg cursor-pointer transition ${
                          activeCategory === category.id
                            ? 'bg-orange-100 text-orange-800 border border-orange-200'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-xs text-gray-500">
                              {menuItems.filter(item => item.category_id === category.id).length} items
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditCategory(category);
                              }}
                              className="p-1 text-gray-400 hover:text-blue-600 transition"
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCategory(category.id);
                              }}
                              className="p-1 text-gray-400 hover:text-red-600 transition"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {categories.find(c => c.id === activeCategory)?.name || 'Menu Items'}
                </h2>
              </div>
              <div className="p-4">
                {!activeCategory || activeCategoryItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">
                      {!activeCategory ? 'Select a category to view items' : 'No items in this category'}
                    </p>
                    {activeCategory && (
                      <button
                        onClick={() => setShowItemForm(true)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                      >
                        Add First Item
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeCategoryItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleEditItem(item)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition"
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-orange-600">₹{item.price}</span>
                          <div className="flex space-x-2">
                            {item.is_veg && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Veg</span>
                            )}
                            {item.is_spicy && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Spicy</span>
                            )}
                            {item.is_featured && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Featured</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Form Modal */}
      {showCategoryForm && (
        <CategoryFormModal
          category={editingCategory}
          onClose={() => {
            setShowCategoryForm(false);
            setEditingCategory(null);
          }}
          onSave={handleAddCategory}
        />
      )}

      {/* Item Form Modal */}
      {showItemForm && (
        <ItemFormModal
          item={editingItem}
          onClose={() => {
            setShowItemForm(false);
            setEditingItem(null);
          }}
          onSave={handleAddItem}
        />
      )}
    </div>
  );
}

interface CategoryFormModalProps {
  category: MenuCategory | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

function CategoryFormModal({ category, onClose, onSave }: CategoryFormModalProps) {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {category ? 'Edit Category' : 'Add New Category'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Appetizers, Main Course"
              />
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
                placeholder="Brief description of this category"
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
                {category ? 'Update' : 'Add'} Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

interface ItemFormModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

function ItemFormModal({ item, onClose, onSave }: ItemFormModalProps) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    price: item?.price || 0,
    is_veg: item?.is_veg || false,
    is_spicy: item?.is_spicy || false,
    is_featured: item?.is_featured || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {item ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Chicken Biryani"
              />
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
                placeholder="Describe the dish and its ingredients"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Item Properties
              </label>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="is_veg"
                  checked={formData.is_veg}
                  onChange={(e) => setFormData({ ...formData, is_veg: e.target.checked })}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="is_veg" className="text-sm text-gray-700">
                  Vegetarian
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="is_spicy"
                  checked={formData.is_spicy}
                  onChange={(e) => setFormData({ ...formData, is_spicy: e.target.checked })}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="is_spicy" className="text-sm text-gray-700">
                  Spicy
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="is_featured" className="text-sm text-gray-700">
                  Featured Item
                </label>
              </div>
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
                {item ? 'Update' : 'Add'} Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 