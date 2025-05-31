"use client";
import { useState } from 'react';
import { createSafeSupabaseClient } from '@/lib/supabase';

// Disable static generation for this page
export const dynamic = 'force-dynamic';

export default function AddProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    const supabase = createSafeSupabaseClient();
    if (!supabase) {
      setError('Failed to initialize database connection');
      setLoading(false);
      return;
    }
    
    let imageUrl = '';
    try {
      // 1. Upload image if present
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('menu-images').upload(fileName, image);
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage.from('menu-images').getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }
      // 2. Insert product into menu_items
      const { error: insertError } = await supabase.from('menu_items').insert([
        {
          name,
          description,
          price: parseFloat(price),
          image_url: imageUrl,
        },
      ]);
      if (insertError) throw insertError;
      setSuccess('Product added successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
      // Optionally redirect or refresh
      // router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
} 