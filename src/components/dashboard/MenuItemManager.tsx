'use client';

import { useState } from 'react';

export default function MenuItemManager() {
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    category_id: '',
  });

  return (
    <div className="space-y-4">
      <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Item name"
          className="rounded-md border-gray-300 shadow-sm focus:border-kerala-green focus:ring-kerala-green"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="rounded-md border-gray-300 shadow-sm focus:border-kerala-green focus:ring-kerala-green"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="sm:col-span-2 rounded-md border-gray-300 shadow-sm focus:border-kerala-green focus:ring-kerala-green"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-kerala-green text-white rounded-md hover:bg-opacity-90"
          >
            Add Menu Item
          </button>
        </div>
      </form>
      
      <div className="mt-8">
        {/* Menu items list will be rendered here */}
      </div>
    </div>
  );
}