import Image from 'next/image';
import { FaCheckCircle, FaWhatsapp, FaInstagram, FaPhoneAlt, FaEnvelope, FaQrcode, FaMobileAlt, FaUtensils } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="/images/logo.jpg" alt="Menufy Logo" width={32} height={32} />
          <span className="text-2xl font-bold tracking-tight text-gray-900">menufy</span>
        </div>
        <div className="flex items-center space-x-8">
          <a href="#how-it-works" className="text-gray-600 hover:text-orange-600 font-medium transition">How it works</a>
          <a href="#scenarios" className="text-gray-600 hover:text-orange-600 font-medium transition">Scenarios</a>
          <a href="#advantages" className="text-gray-600 hover:text-orange-600 font-medium transition">Advantages</a>
          <a href="#faq" className="text-gray-600 hover:text-orange-600 font-medium transition">FAQ</a>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">Get an online menu</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
              Selling QR menu for your restaurant in <span className="text-orange-500">2 hours</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Just leave a request and our team will develop an online menu for your bar, café or restaurant in 2 hours
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <button className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition">
                Get an online menu in 2 hours
              </button>
              <a
                href="/menu/demo"
                className="px-8 py-4 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                View Demo Menu
              </a>
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-200 p-8 rounded-3xl shadow-2xl">
              {/* Decorative background elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-orange-300 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute bottom-6 left-6 w-16 h-16 bg-yellow-300 rounded-full opacity-30 animate-bounce"></div>
              <div className="absolute top-1/2 left-4 w-12 h-12 bg-orange-400 rounded-full opacity-15"></div>
              
              <Image
                src="/images/1.png"
                alt="QR Menu Restaurant Demo"
                width={350}
                height={180}
                className="object-contain relative z-10"
                priority
              />
              
              {/* Additional decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-200/20 to-transparent rounded-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
        
        {/* Customer logos section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">Our customers:</p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="w-24 h-12 bg-gray-200 rounded"></div>
            <div className="w-24 h-12 bg-gray-200 rounded"></div>
            <div className="w-24 h-12 bg-gray-200 rounded"></div>
            <div className="w-24 h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">How it works</h2>
          <p className="text-xl text-center text-gray-600 mb-16">How it works for the guest</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaQrcode className="text-3xl text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Scanning of the QR</h3>
              <p className="text-gray-600 leading-relaxed">
                The visitor scans the QR in a restaurant using camera of a mobile device. The action is performed with one click, there is no need to install any applications.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMobileAlt className="text-3xl text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Opening the menu</h3>
              <p className="text-gray-600 leading-relaxed">
                An access to online menu with intuitive navigation, unlimited amount of photos, descriptions and prices of dishes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUtensils className="text-3xl text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Placing an order</h3>
              <p className="text-gray-600 leading-relaxed">
                Being easily navigated, the client selects suitable dishes and places an order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Benefits for business</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Savings on printing</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Less time and money spent on updating the menu, e.g. in the event of price or design change.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Multi language</h3>
              <p className="text-gray-600 leading-relaxed">
                Speak the language of your guests.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Simplification of the system</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Thanks to the digital format, prices and photos in your online menu can be edited easily and free of charge. You also have an opportunity to introduce new dishes and update stop lists.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Turnover increase</h3>
              <p className="text-gray-600 leading-relaxed">
                Digital QR code menu with photos ensures colorfulness and ease of choice for the customer. Looking at "appetizing" food photos, the guest feels comfortable and makes more spontaneous purchases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios Section */}
      <section id="scenarios" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Scenarios and applicability</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">The visitor cares about the hygiene</h3>
              <p className="text-gray-600">
                Paper menu, just like banknotes, passes through thousands of hands and contains bacteria and viruses on its surface.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Instead of a thousand words</h3>
              <p className="text-gray-600">
                HoReCa segment often doesn't pay enough attention to food photos. They keep making text menus without pictures, although over 60% of people on the Earth perceive the world around them visually.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Pre-order</h3>
              <p className="text-gray-600">
                The client wants to come to a laid table without making calls or correspondence, or to place an order online and take the dish away.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Online payment</h3>
              <p className="text-gray-600">
                Online payment can be set up for pre-order or order with delivery. Funds are deposited immediately and directly to the account of restaurant.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Promotions</h3>
              <p className="text-gray-600">
                Thematic offers can be added to the contactless menu at any time. After a couple of clicks in the program, the dish of the day will flaunt on the main screen.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Analytics</h3>
              <p className="text-gray-600">
                The program takes over this function and determines the gender, age, interests and preferences of the existing clientele.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Advantages</h2>
          <p className="text-xl text-gray-600 mb-8">
            How the introduction of the QR menu has affected the efficiency of the fast food restaurants
          </p>
          <p className="text-gray-600 mb-8">
            The restaurant works as a takeaway, and also cooperates with other coffee houses and canteens, supplying breakfasts, pastries and desserts.
          </p>
          <div className="bg-orange-500 text-white inline-block px-8 py-4 rounded-lg text-2xl font-bold">
            Boost your sales up to 40%
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Frequently asked questions</h2>
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">How to generate a QR code for a menu?</h3>
              <p className="text-gray-600">
                Menufy creates an electronic QR code automatically as you connect to the service. You just have to print the code and place it on the tables.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Is it possible to use the contactless menu as a website for a restaurant or café?</h3>
              <p className="text-gray-600">
                You can and should use the online menu as a website for you restaurant or café. In addition to the QR code, a link is created for the menu, which can be shared on social networks, both by the owners of the restaurants and visitors.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Will the guest be able to place an order remotely using the QR menu?</h3>
              <p className="text-gray-600">
                Yes, Menufy supports the function of remote dishes pre-ordering. The contactless menu can be accessed not only by scanning the QR code, but also via the link shared on the restaurant's social networks.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">What benefits will I get by installing a contactless menu in my restaurant?</h3>
              <p className="text-gray-600">
                The main advantage of Menufy is the provision of visitor analytics. The owner of the restaurant will know the client profile: history of orders, gender, age, interests. Menufy will help you find potential clients similar to existing ones and set up targeted ads for them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Get an online menu</h2>
          <p className="text-xl mb-8 opacity-90">
            Leave a request and our team will create an online menu for your restaurant in 2 hours
          </p>
          
          <form className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              placeholder="Restaurant Name"
              className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <input
              type="tel"
              placeholder="Contact phone number"
              className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <input
              type="email"
              placeholder="Please enter your e-mail"
              className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <button
              type="submit"
              className="w-full bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get online menu
            </button>
          </form>
          
          <p className="text-sm mt-6 opacity-75">
            By checking the box, you agree and confirm that you are fully acquainted with the user agreement, accept all its terms and undertake to fulfill all obligations specified in it
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/images/logo.jpg" alt="Menufy Logo" width={32} height={32} />
              <span className="text-2xl font-bold">menufy</span>
            </div>
            <p className="text-gray-400 mb-4">Contactless QR menu for restaurants</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="hover:text-orange-400">How it works</a></li>
              <li><a href="#scenarios" className="hover:text-orange-400">Scenarios</a></li>
              <li><a href="#advantages" className="hover:text-orange-400">Advantages</a></li>
              <li><a href="#faq" className="hover:text-orange-400">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="text-orange-400" />
                <span>+7 (707) 770 11 30</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-orange-400" />
                <span>info@menufy.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">News subscription</h4>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Please enter your e-mail"
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:border-orange-400 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 px-3 py-2 rounded hover:bg-orange-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="text-center text-gray-500 mt-8 pt-8 border-t border-gray-800">
          <p>© 2020-2024, All rights reserved</p>
          <p className="mt-2">Made with ❤️ for Kerala restaurants</p>
        </div>
      </footer>
    </div>
  );
}
