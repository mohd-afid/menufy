import Image from 'next/image';
import { FaCheckCircle, FaWhatsapp, FaInstagram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-purple-50 font-sans">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="/images/logo.jpg" alt="Menufy Logo" width={32} height={32} />
          <span className="text-2xl font-bold tracking-tight text-gray-900">menufy</span>
        </div>
        <div className="flex items-center space-x-8">
          <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 font-medium transition">How it works</a>
          <a href="#scenarios" className="text-gray-600 hover:text-purple-600 font-medium transition">Scenarios</a>
          <a href="#advantages" className="text-gray-600 hover:text-purple-600 font-medium transition">Advantages</a>
          <a href="#faq" className="text-gray-600 hover:text-purple-600 font-medium transition">FAQ</a>
          <button className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 shadow-lg transition">Book a demo</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900 drop-shadow-lg">
            Selling QR menu for your restaurant in <span className="text-purple-500">2 hours</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-lg">
            Just leave a request and our team will develop an online menu for your bar, café or restaurant in 2 hours
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-4">
            <button className="bg-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-purple-600 transition-all">
              Get an online menu in 2 hours
            </button>
            <a
              href="/menu/demo"
              className="px-8 py-4 bg-yellow-300 text-purple-900 rounded-lg font-semibold shadow hover:bg-yellow-400 transition-all transform hover:scale-105"
            >
              View Demo Menu
            </a>
          </div>
          {/* Testimonial badge */}
          <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow border w-max mt-4 animate-fade-in">
            <Image src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=48&h=48" alt="User" width={32} height={32} className="rounded-full" />
            <span className="font-medium text-gray-700">4.9/5</span>
            <FaCheckCircle className="text-green-500" />
            <span className="text-gray-400 text-sm">1290+ customers</span>
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <div className="bg-yellow-100 rounded-3xl p-8 relative overflow-hidden shadow-2xl animate-float">
            <Image 
              src="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
              alt="Pizza Sample"
              width={400}
              height={400}
              className="object-cover rounded-2xl shadow-lg border-4 border-white"
              priority
            />
            <Image 
              src="/images/phone-mockup.png" 
              alt="Menu App Demo" 
              width={220} 
              height={440} 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 drop-shadow-2xl"
            />
            <div className="absolute top-8 left-8 w-16 h-16 animate-bounce z-20">
              <Image src="/images/qr-code.svg" alt="QR Code" width={64} height={64} />
            </div>
            <div className="absolute bottom-8 right-8 w-16 h-16 animate-bounce z-20">
              <Image src="/images/qr-code.svg" alt="QR Code" width={64} height={64} />
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How it works for the guest</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-yellow-50 rounded-2xl p-8 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="bg-yellow-200 p-4 rounded-full mb-4">
                <Image src="/images/qr-code.svg" alt="QR Scan" width={48} height={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scanning of the QR</h3>
              <p className="text-gray-600">The visitor scans the QR in a restaurant using the camera of a mobile device. No app needed.</p>
            </div>
            {/* Step 2 */}
            <div className="bg-purple-50 rounded-2xl p-8 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="bg-purple-200 p-4 rounded-full mb-4">
                <Image src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=48&q=80" alt="Menu" width={48} height={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Opening the menu</h3>
              <p className="text-gray-600">Access an online menu with intuitive navigation, unlimited photos, descriptions, and prices.</p>
            </div>
            {/* Step 3 */}
            <div className="bg-yellow-50 rounded-2xl p-8 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="bg-yellow-200 p-4 rounded-full mb-4">
                <Image src="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=48&q=80" alt="Order" width={48} height={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Placing an order</h3>
              <p className="text-gray-600">The client selects dishes and places an order easily. No calls or correspondence needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/images/logo.jpg" alt="Menufy Logo" width={32} height={32} />
              <span className="text-2xl font-bold">menufy</span>
            </div>
            <p className="text-gray-400 mb-4">Contactless QR menu for restaurants</p>
            <div className="flex space-x-4">
              <a href="tel:+77077701130" className="hover:text-purple-400"><FaPhoneAlt /></a>
              <a href="mailto:info@menufy.com" className="hover:text-purple-400"><FaEnvelope /></a>
              <a href="#" className="hover:text-purple-400"><FaWhatsapp /></a>
              <a href="#" className="hover:text-purple-400"><FaInstagram /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="hover:text-purple-400">How it works</a></li>
              <li><a href="#scenarios" className="hover:text-purple-400">Scenarios</a></li>
              <li><a href="#advantages" className="hover:text-purple-400">Advantages</a></li>
              <li><a href="#faq" className="hover:text-purple-400">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">News subscription</h4>
            <form className="flex space-x-2">
              <input type="email" placeholder="Enter your e-mail" className="px-4 py-2 rounded-l-lg bg-gray-800 border-none focus:ring-2 focus:ring-purple-400" />
              <button type="submit" className="bg-purple-500 px-4 py-2 rounded-r-lg hover:bg-purple-600 transition">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8 text-sm">© 2024 Menufy. All rights reserved.</div>
      </footer>
    </div>
  );
}
