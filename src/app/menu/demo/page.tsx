'use client';
import { useState } from 'react';

// Define a type for menu items
interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  veg: boolean;
  category: string;
}

export default function DemoMenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const menuItems = [
    {
      name: "Kerala Parotta",
      description: "Flaky layered flatbread, perfect with any curry",
      price: "₹40",
      image: "https://www.shutterstock.com/image-photo/kerala-paratha-porotta-spicy-beef-600w-1177440301.jpg",
      veg: true,
      category: "Breakfast"
    },
    {
      name: "Puttu & Kadala",
      description: "Steamed rice cake with black chickpea curry",
      price: "₹80",
      image: "https://example.com/puttu.jpg",
      veg: true,
      category: "Breakfast"
    },
    {
      name: "Beef Curry",
      description: "Spicy traditional Kerala beef curry",
      price: "₹180",
      image: "https://example.com/beef.jpg",
      veg: false,
      category: "Lunch"
    },
    {
      name: "Chicken Biriyani",
      description: "Fragrant rice dish with spiced chicken",
      price: "₹220",
      image: "https://example.com/biriyani.jpg",
      veg: false,
      category: "Lunch"
    },
    {
      name: "Fish Molee",
      description: "Creamy coconut fish curry",
      price: "₹220",
      image: "https://example.com/fish.jpg",
      veg: false,
      category: "Dinner"
    },
    {
      name: "Appam & Stew",
      description: "Lacy rice pancakes with vegetable stew",
      price: "₹150",
      image: "https://example.com/appam.jpg",
      veg: true,
      category: "Dinner"
    },
    {
      name: "Mango Lassi",
      description: "Refreshing yogurt drink with mango",
      price: "₹80",
      image: "https://example.com/lassi.jpg",
      veg: true,
      category: "Beverages"
    },
    {
      name: "Payasam",
      description: "Traditional Kerala sweet pudding",
      price: "₹100",
      image: "https://example.com/payasam.jpg",
      veg: true,
      category: "Desserts"
    },
  ];

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedItems = filteredItems.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as Record<string, typeof menuItems>);

  function addToCart(item: MenuItem) {
    setCart(prev => [...prev, item]);
  }

  function removeFromCart(index: number) {
    setCart(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Cart Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => setCartOpen(true)} className="relative bg-kerala-green text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0A48.108 48.108 0 005.25 8.25m0 0h13.5m-13.5 0l1.5 6.75m12-6.75l1.5 6.75m-15 0h16.5m-16.5 0a2.25 2.25 0 002.25 2.25h11.25a2.25 2.25 0 002.25-2.25m-15 0l1.5-6.75m13.5 0l1.5-6.75" />
          </svg>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">{cart.length}</span>
          )}
        </button>
      </div>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-black">✕</button>
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="flex-1 overflow-y-auto divide-y">
                {cart.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-semibold">{(item as {name: string}).name}</div>
                      <div className="text-sm text-gray-600">{(item as {price: string}).price}</div>
                    </div>
                    <button onClick={() => removeFromCart(idx)} className="text-red-500 hover:underline text-xs">Remove</button>
                  </li>
                ))}
              </ul>
            )}
            <button className="mt-6 w-full bg-kerala-green text-white py-2 rounded-lg font-bold hover:bg-green-700 transition">Checkout</button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="sticky top-0 bg-white shadow-md z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full p-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-16 bg-white shadow-sm z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-4 overflow-x-auto py-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === category ? 'bg-kerala-green text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

   {/* Menu Items */}
<div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
  {Object.entries(groupedItems).map(([category, items]) => (
    <div key={category}>
      {/* Category Heading */}
      <h2 className="text-xl font-semibold mb-4">{category}</h2>

      {/* Item Cards */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition"
          >
            {/* Left: Image */}
            <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {(item as MenuItem & { featured?: boolean }).featured && (
                <div className="absolute top-1 left-1 bg-yellow-400 text-white text-xs px-1.5 py-0.5 rounded-full">
                  ★
                </div>
              )}
            </div>

            {/* Middle: Text Info */}
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
              {item.description && (
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
              )}
              <p className="text-gray-900 font-semibold mt-2">{item.price}</p>
            </div>

            {/* Right: + Button */}
            <button
              className="text-2xl text-kerala-green font-bold hover:scale-110 transition ml-4"
              onClick={() => addToCart(item)}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

    </div>
  );
}