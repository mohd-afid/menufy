'use client';

import { useState } from 'react';

export default function CategoryManager() {
  const [newCategory, setNewCategory] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Add new category..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-kerala-green focus:ring-kerala-green"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-kerala-green text-white rounded-md hover:bg-opacity-90"
        >
          Add Category
        </button>
      </div>
      
      <div className="mt-4">
        {/* Category list will be rendered here */}
      </div>
    </div>
  );
}