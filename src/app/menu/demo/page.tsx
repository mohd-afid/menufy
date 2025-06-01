'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FaSearch, FaShoppingCart, FaTimes, FaPlus, FaMinus, FaLeaf, FaFire } from 'react-icons/fa';

// Define a type for menu items
interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  veg: boolean;
  category: string;
  featured?: boolean;
  spicy?: boolean;
  rating?: number;
}

export default function DemoMenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<(MenuItem & { quantity: number })[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      name: "Kerala Parotta",
      description: "Flaky layered flatbread, perfect with any curry. Made fresh daily with traditional techniques.",
      price: "₹40",
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400&q=80",
      veg: true,
      category: "Breakfast",
      featured: true,
      rating: 4.8
    },
    {
      name: "Puttu & Kadala",
      description: "Steamed rice cake with black chickpea curry. A traditional Kerala breakfast delight.",
      price: "₹80",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80",
      veg: true,
      category: "Breakfast",
      rating: 4.6
    },
    {
      name: "Beef Curry",
      description: "Spicy traditional Kerala beef curry with aromatic spices and coconut milk.",
      price: "₹180",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80",
      veg: false,
      category: "Lunch",
      spicy: true,
      rating: 4.9
    },
    {
      name: "Chicken Biriyani",
      description: "Fragrant basmati rice dish with tender chicken pieces and exotic spices.",
      price: "₹220",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d71d?auto=format&fit=crop&w=400&q=80",
      veg: false,
      category: "Lunch",
      featured: true,
      rating: 4.7
    },
    {
      name: "Fish Molee",
      description: "Creamy coconut fish curry with fresh catch of the day and Kerala spices.",
      price: "₹220",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80",
      veg: false,
      category: "Dinner",
      rating: 4.8
    },
    {
      name: "Appam & Stew",
      description: "Lacy rice pancakes with aromatic vegetable stew in coconut milk.",
      price: "₹150",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=400&q=80",
      veg: true,
      category: "Dinner",
      rating: 4.5
    },
    {
      name: "Mango Lassi",
      description: "Refreshing yogurt drink blended with fresh mango pulp and cardamom.",
      price: "₹80",
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=400&q=80",
      veg: true,
      category: "Beverages",
      rating: 4.4
    },
    {
      name: "Payasam",
      description: "Traditional Kerala sweet pudding made with rice, milk, and jaggery.",
      price: "₹100",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=400&q=80",
      veg: true,
      category: "Desserts",
      featured: true,
      rating: 4.6
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
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function removeFromCart(itemName: string) {
    setCart(prev => prev.filter(item => item.name !== itemName));
  }

  function updateQuantity(itemName: string, newQuantity: number) {
    if (newQuantity === 0) {
      removeFromCart(itemName);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.name === itemName ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace('₹', ''));
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Taste of Kerala</h1>
            <p className="text-sm sm:text-base text-gray-600">Authentic flavors from God&apos;s Own Country</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
            <input
              type="text"
              placeholder="Search for dishes..."
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-20 sm:top-24 bg-white/90 backdrop-blur-sm z-30 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full whitespace-nowrap text-sm sm:text-base font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-24 sm:pb-32">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-8 sm:mb-12">
            {/* Category Heading */}
            <div className="flex items-center mb-4 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{category}</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent ml-2 sm:ml-4"></div>
            </div>

            {/* Item Cards */}
            <div className="space-y-4 sm:space-y-6">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative w-full sm:w-40 md:w-48 h-48 sm:h-32 md:h-auto overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.featured && (
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          ⭐ Featured
                        </div>
                      )}
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex space-x-1">
                        {item.veg && (
                          <div className="bg-green-500 p-1 rounded-full">
                            <FaLeaf className="text-white text-xs" />
                          </div>
                        )}
                        {item.spicy && (
                          <div className="bg-red-500 p-1 rounded-full">
                            <FaFire className="text-white text-xs" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors flex-1 pr-2">
                            {item.name}
                          </h3>
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            <span className="text-yellow-400 text-sm">⭐</span>
                            <span className="text-xs sm:text-sm text-gray-600">{item.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xl sm:text-2xl font-bold text-gray-900">
                            {item.price}
                          </div>
                          
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-orange-500 hover:bg-orange-600 text-white rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 z-50"
        >
          <div className="flex items-center space-x-2 sm:space-x-3">
            <FaShoppingCart className="text-lg sm:text-xl" />
            <div className="text-left">
              <div className="text-xs sm:text-sm font-medium">{totalItems} items</div>
              <div className="text-sm sm:text-lg font-bold">₹{totalAmount}</div>
            </div>
          </div>
        </button>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-white w-full sm:w-full sm:max-w-md h-full shadow-2xl flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Order</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="text-gray-600 text-sm sm:text-base" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FaShoppingCart className="text-4xl sm:text-6xl text-gray-300 mb-3 sm:mb-4" />
                  <p className="text-gray-500 text-base sm:text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm">Add some delicious items!</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                      <div className="flex justify-between items-start mb-2 sm:mb-3">
                        <div className="flex-1 pr-2">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{item.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-600">{item.price} each</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <FaTimes className="text-xs sm:text-sm" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <button
                            onClick={() => updateQuantity(item.name, item.quantity - 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <FaMinus className="text-xs text-gray-600" />
                          </button>
                          <span className="font-medium text-gray-900 w-6 sm:w-8 text-center text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.name, item.quantity + 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                        </div>
                        <div className="font-bold text-gray-900 text-sm sm:text-base">
                          ₹{parseInt(item.price.replace('₹', '')) * item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <span className="text-base sm:text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">₹{totalAmount}</span>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg">
                  Place Order
                </button>
                <p className="text-xs text-gray-500 text-center mt-2 sm:mt-3">
                  Taxes and delivery charges may apply
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}