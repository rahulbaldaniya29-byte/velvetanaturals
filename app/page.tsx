'use client';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
declare global {
  interface Window {
    Razorpay: any;
  }
}
export default function HomePage() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [customerName1, setCustomerName1] = useState('');
const [customerPhone1, setCustomerPhone1] = useState('');

const [customerName2, setCustomerName2] = useState('');
const [customerPhone2, setCustomerPhone2] = useState('');

const [address1, setAddress1] = useState('');
const [city1, setCity1] = useState('');
const [pincode1, setPincode1] = useState('');

const [address2, setAddress2] = useState('');
const [city2, setCity2] = useState('');
const [pincode2, setPincode2] = useState('');

  


  return (
    <main className="min-h-screen bg-[#fdfcf8]">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#0d2418]/70 border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#d6b37a]">
            Velveta
          </h1>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-10 text-white">
            <a href="#home" className="hover:text-[#d6b37a] transition">Home</a>
            <a href="#products" className="hover:text-[#d6b37a] transition">Products</a>
            <a href="#about" className="hover:text-[#d6b37a] transition">About</a>
            <a href="#contact" className="hover:text-[#d6b37a] transition">Contact</a>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white text-3xl"
            >
              {menuOpen ? '✕' : '☰'}
            </button>


            <button className="px-5 py-2 rounded-full bg-[#4f7c5d] text-white hover:bg-[#5e9170] transition">
              Shop Now
            </button>

          </div>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mobile-menu md:hidden px-6 pb-5">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-5 text-white">
              <a href="#home" className="hover:text-[#d6b37a] transition">Home</a>
              <a href="#products" className="hover:text-[#d6b37a] transition">Products</a>
              <a href="#about" className="hover:text-[#d6b37a] transition">About</a>
              <a href="#contact" className="hover:text-[#d6b37a] transition">Contact</a>
            </div>
          </div>
        )}

      </header>

      
      {/* HERO SECTION */}
      <section id="home" className="hero-grid relative min-h-screen overflow-hidden bg-gradient-to-br from-[#173926] via-[#1f4d35] to-[#0d2016] flex items-center justify-center px-6">

        {/* Glow Effects */}
        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-[#4fa46d]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-[#c3955d]/20 rounded-full blur-3xl animate-pulse"></div>

        {/* Content */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">

          {/* LEFT */}
          <div>
            <span className="px-5 py-2 rounded-full border border-white/20 text-white/70 text-sm tracking-[3px] uppercase bg-white/5 backdrop-blur-md">
              Premium Ayurvedic Wellness
            </span>

            <h1 className="fade-up mt-8 text-6xl md:text-7xl font-black leading-tight text-white">
              Natural <span className="text-[#c3955d]">Luxury</span> <br />
              For Modern Wellness
            </h1>

            <p className="fade-up mt-8 text-lg leading-relaxed text-white/70 max-w-xl">
              Discover powerful Ayurvedic formulations crafted with nature,
              science, and luxury wellness experience for modern lifestyles.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">
              <button className="glow-button px-8 py-4 rounded-full bg-[#c3955d] hover:bg-[#d9ab73] text-black font-semibold transition-all duration-300 hover:scale-105 shadow-2xl">
                Shop Now
              </button>
              <button className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition-all duration-300">
                Explore Products
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center">
            <div className="absolute w-[450px] h-[450px] rounded-full bg-[#ffffff10] blur-3xl"></div>
            <Image
              src="/product1.jpeg"
              alt="Velveta Product"
              width={450}
              height={450}
              className="object-contain h-auto relative z-10 drop-shadow-[0_20px_80px_rgba(0,0,0,0.6)] floating-animation"
              priority
            />
          </div>

        </div>

      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-28 px-6 bg-[#fdfcf8]">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-[#173926]">Featured Products</h2>
            <p className="mt-5 text-[#4d5c54] max-w-2xl mx-auto text-lg">
              Discover our premium Ayurvedic wellness collection crafted
              from the finest natural ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* CARD 1 */}
            <div className="group glass-card premium-card rounded-[35px] overflow-hidden shadow-xl border border-[#dfe7e1] hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

              <div className="h-[380px] bg-gradient-to-br from-[#2f5d43] to-[#173926] flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl"></div>
                <Image
                  src="/product1.jpeg"
                  alt="Arogya Churn"
                  width={270}
                  height={270}
                  className="object-contain w-auto h-auto group-hover:scale-110 transition duration-700 drop-shadow-2xl"
                />
              </div>

              <div className="p-8">
                <h3 className="text-3xl font-bold text-[#173926]">Arogya Churn</h3>
                <p className="mt-4 text-[#5a685f] leading-relaxed">
                  Herbal Ayurvedic formula designed to improve digestion,
                  immunity, detoxification, and natural daily energy.
                </p>
                <div className="mt-8">
                  <span className="text-3xl font-bold text-[#c3955d]">₹799</span>
                  <div className="mt-6 space-y-4">

  <input
    type="text"
    placeholder="Your Name"
    value={customerName1}
    onChange={(e) => setCustomerName1(e.target.value)}
    className="w-full px-5 py-3 rounded-2xl border border-[#dfe7e1] outline-none"
  />

  <input
    type="text"
    placeholder="Phone Number"
    value={customerPhone1}
    onChange={(e) => setCustomerPhone1(e.target.value)}
    className="w-full px-5 py-3 rounded-2xl border border-[#dfe7e1] outline-none"
  />

  <textarea
    placeholder="Delivery Address"
    value={address1}
    onChange={(e) => setAddress1(e.target.value)}
    className="w-full px-5 py-3 rounded-2xl border border-[#dfe7e1] outline-none"
  />

  <input
    type="text"
    placeholder="City"
    value={city1}
    onChange={(e) => setCity1(e.target.value)}
    className="w-full px-5 py-3 rounded-2xl border border-[#dfe7e1] outline-none"
  />

  <input
    type="text"
    placeholder="Pincode"
    value={pincode1}
    onChange={(e) => setPincode1(e.target.value)}
    className="w-full px-5 py-3 rounded-2xl border border-[#dfe7e1] outline-none"
  />

</div>
         <button
  onClick={() => {

    const options = {
      

      key: "rzp_test_SsH2DYkn4YrvhB",

      amount: 79900,

      currency: "INR",

      name: "Velveta Naturals",

      description: "Arogya Churn",

      image: "/product1.jpeg",
      method: {
  upi: true,
  card: true,
  netbanking: true,
  wallet: true,
},

      handler: async function (response: any) {

        await supabase
          .from('orders')
          .insert([
            {
              product_name: 'Arogya Churn',
              amount: 799,
              customer_name: customerName1,
              customer_phone: customerPhone1,
              customer_address: address1,
              customer_city: city1,
              customer_pincode: pincode1,
              payment_id: response.razorpay_payment_id,
            }
          ]);

        window.location.href = "/success";

      },

      theme: {
        color: "#173926",
      },

    };
options.method = {
  card: true,
  netbanking: true,
  wallet: true,
  upi: true,
};
    const rzp = new window.Razorpay(options);

    rzp.open();

  }}

  className="relative z-50 px-6 py-3 rounded-full bg-[#2f5d43] hover:bg-[#3c7353] hover:scale-105 text-white transition-all duration-300"
>
  Buy Now
</button>

<button
  onClick={() => {

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    cart.push({
      name: 'Arogya Churn',
      price: 799,
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    window.location.href = '/cart';

  }}

  className="mt-4 ml-4 px-6 py-3 rounded-full border border-[#173926] text-[#173926] hover:bg-[#173926] hover:text-white transition-all duration-300"
>
  Add To Cart
</button>

                </div>
              </div>

            </div>

            {/* CARD 2 */}
            <div className="group glass-card premium-card rounded-[35px] overflow-hidden shadow-xl border border-[#dfe7e1] hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

              <div className="h-[380px] bg-gradient-to-br from-[#66552d] to-[#2d2412] flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl"></div>
                <Image
                  src="/product2.jpeg"
                  alt="B12 Super Food"
                  width={270}
                  height={270}
                  className="object-contain w-auto h-auto group-hover:scale-110 transition duration-700 drop-shadow-2xl"
                />
              </div>

              <div className="p-8">
                <h3 className="text-3xl font-bold text-[#173926]">B12 Super Food</h3>
                <p className="mt-4 text-[#5a685f] leading-relaxed">
                  Advanced herbal nutrition blend supporting stamina,
                  energy, immunity, and complete body wellness naturally.
                </p>
                <div className="mt-8">
                  <span className="text-3xl font-bold text-[#c3955d]">₹999</span>
                  <div className="mt-6 space-y-4">

  <input
    type="text"
    placeholder="Your Name"
    value={customerName2}
    onChange={(e) => setCustomerName2(e.target.value)}
    className="w-full px-5 py-3 rounded-2xl border border-[#dfe7e1] outline-none"
  />
  <input
    type="text"
    placeholder="Phone Number"
    value={customerPhone2}
    onChange={(e) => setCustomerPhone2(e.target.value)}
    className="w-full px-5 py-3 rounded-2xl border border-[#dfe7e1] outline-none"
  />

  <textarea
    placeholder="Delivery Address"
    value={address2}
    onChange={(e) => setAddress2(e.target.value)}
    className="w-full px-5 py-3 rounded-2xl border border-[#dfe7e1] outline-none"
  />

  <input
    type="text"
    placeholder="City"
    value={city2}
    onChange={(e) => setCity2(e.target.value)}
    className="w-full px-5 py-3 rounded-2xl border border-[#dfe7e1] outline-none"
  />

  <input
    type="text"
    placeholder="Pincode"
    value={pincode2}
    onChange={(e) => setPincode2(e.target.value)}
    className="w-full px-5 py-3 rounded-2xl border border-[#dfe7e1] outline-none"
  />

</div>
         <button
  onClick={() => {

    const options = {

      key: "rzp_test_SsH2DYkn4YrvhB",

      amount: 99900,

      currency: "INR",

      name: "Velveta Naturals",

      description: "B12 Super Food",

      image: "/product2.jpeg",
      method: {
  upi: true,
  card: true,
  netbanking: true,
  wallet: true,
},

      handler: async function (response: any) {

        await supabase
          .from('orders')
          .insert([
            {
              product_name: 'B12 Super Food',
              amount: 999,
              customer_name: customerName2,
              customer_phone: customerPhone2,
              customer_address: address2,
              customer_city: city2,
              customer_pincode: pincode2,
              payment_id: response.razorpay_payment_id,
            }
          ]);

        window.location.href = "/success";

      },

      theme: {
        color: "#173926",
      },

    };
    options.method = {
  card: true,
  netbanking: true,
  wallet: true,
  upi: true,
};

    const rzp = new window.Razorpay(options);

    rzp.open();

  }}

  className="relative z-50 px-6 py-3 rounded-full bg-[#2f5d43] hover:bg-[#3c7353] hover:scale-105 text-white transition-all duration-300"
>
  Buy Now
</button>

<button
  onClick={() => {

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    cart.push({
      name: 'B12 Super Food',
      price: 999,
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    window.location.href = '/cart';

  }}

  className="mt-4 ml-4 px-6 py-3 rounded-full border border-[#173926] text-[#173926] hover:bg-[#173926] hover:text-white transition-all duration-300"
>
  Add To Cart
</button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 px-6 bg-[#173926] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <h2 className="text-5xl font-black text-[#c3955d]">10K+</h2>
            <p className="mt-4 text-white/70 text-lg">Happy Customers</p>
          </div>
          <div>
            <h2 className="text-5xl font-black text-[#c3955d]">100%</h2>
            <p className="mt-4 text-white/70 text-lg">Natural Ingredients</p>
          </div>
          <div>
            <h2 className="text-5xl font-black text-[#c3955d]">25+</h2>
            <p className="mt-4 text-white/70 text-lg">Ayurvedic Herbs</p>
          </div>
          <div>
            <h2 className="text-5xl font-black text-[#c3955d]">4.9★</h2>
            <p className="mt-4 text-white/70 text-lg">Customer Rating</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 px-6 bg-[#f7f4ee]">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-[#173926]">What Customers Say</h2>
            <p className="mt-5 text-[#5f6b64] text-lg max-w-2xl mx-auto">
              Thousands trust Velveta Naturals for premium wellness
              and authentic Ayurvedic lifestyle transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white rounded-[35px] p-10 shadow-xl border border-[#e4ebe6] hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-center gap-1 text-[#c3955d] text-2xl">★★★★★</div>
              <p className="mt-6 text-[#5d6a63] leading-relaxed">
                Velveta products completely changed my daily wellness routine.
                The quality feels premium and results are amazing.
              </p>
              <div className="mt-8">
                <h4 className="font-bold text-[#173926] text-lg">Rahul Patel</h4>
                <p className="text-[#7d8a83] text-sm">Ahmedabad</p>
              </div>
            </div>

            <div className="bg-white rounded-[35px] p-10 shadow-xl border border-[#e4ebe6] hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-center gap-1 text-[#c3955d] text-2xl">★★★★★</div>
              <p className="mt-6 text-[#5d6a63] leading-relaxed">
                The packaging, quality, and overall experience feels
                like an international luxury wellness brand.
              </p>
              <div className="mt-8">
                <h4 className="font-bold text-[#173926] text-lg">Priya Shah</h4>
                <p className="text-[#7d8a83] text-sm">Surat</p>
              </div>
            </div>

            <div className="bg-white rounded-[35px] p-10 shadow-xl border border-[#e4ebe6] hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-center gap-1 text-[#c3955d] text-2xl">★★★★★</div>
              <p className="mt-6 text-[#5d6a63] leading-relaxed">
                Very smooth website experience and genuinely effective
                Ayurvedic products. Highly recommended.
              </p>
              <div className="mt-8">
                <h4 className="font-bold text-[#173926] text-lg">Meera Joshi</h4>
                <p className="text-[#7d8a83] text-sm">Rajkot</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="about" className="py-28 px-6 bg-[#f7f5ef]">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-[#173926]">Why Choose Velveta</h2>
            <p className="mt-5 text-[#5a685f] max-w-3xl mx-auto text-lg">
              Combining ancient Ayurvedic wisdom with modern wellness science
              to deliver premium natural healing experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="bg-white rounded-[30px] p-10 shadow-xl border border-[#e5ebe7] hover:-translate-y-2 transition-all duration-500">
              <div className="w-20 h-20 rounded-full bg-[#e4efe7] flex items-center justify-center text-4xl mb-8">🌿</div>
              <h3 className="text-2xl font-bold text-[#173926]">100% Natural</h3>
              <p className="mt-5 text-[#5a685f] leading-relaxed">
                Pure herbal ingredients carefully selected from trusted
                Ayurvedic sources without harmful chemicals.
              </p>
            </div>

            <div className="bg-white rounded-[30px] p-10 shadow-xl border border-[#e5ebe7] hover:-translate-y-2 transition-all duration-500">
              <div className="w-20 h-20 rounded-full bg-[#f1e7d7] flex items-center justify-center text-4xl mb-8">✨</div>
              <h3 className="text-2xl font-bold text-[#173926]">Luxury Wellness</h3>
              <p className="mt-5 text-[#5a685f] leading-relaxed">
                Premium quality wellness products designed for modern healthy
                lifestyle and complete body balance.
              </p>
            </div>

            <div className="bg-white rounded-[30px] p-10 shadow-xl border border-[#e5ebe7] hover:-translate-y-2 transition-all duration-500">
              <div className="w-20 h-20 rounded-full bg-[#e4efe7] flex items-center justify-center text-4xl mb-8">🛡️</div>
              <h3 className="text-2xl font-bold text-[#173926]">Trusted Formula</h3>
              <p className="mt-5 text-[#5a685f] leading-relaxed">
                Scientifically crafted Ayurvedic blends focused on immunity,
                energy, digestion, and overall wellness.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS DARK */}
      <section className="py-28 px-6 bg-[#0d2418]">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white">What Our Customers Say</h2>
            <p className="mt-5 text-white/60 max-w-3xl mx-auto text-lg">
              Thousands trust Velveta Naturals for premium Ayurvedic wellness
              and holistic healing experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-10 hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-center gap-1 text-[#d6b37a] text-2xl">★★★★★</div>
              <p className="mt-6 text-white/75 leading-relaxed text-lg">
                Velveta products completely transformed my digestion and
                daily energy levels. Premium quality and beautiful experience.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#31553f]"></div>
                <div>
                  <h4 className="text-white font-semibold">Rahul Patel</h4>
                  <p className="text-white/50 text-sm">Ahmedabad</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-10 hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-center gap-1 text-[#d6b37a] text-2xl">★★★★★</div>
              <p className="mt-6 text-white/75 leading-relaxed text-lg">
                Absolutely luxury wellness experience. Packaging, product
                quality, and results are truly impressive.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#66552d]"></div>
                <div>
                  <h4 className="text-white font-semibold">Priya Shah</h4>
                  <p className="text-white/50 text-sm">Surat</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-10 hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-center gap-1 text-[#d6b37a] text-2xl">★★★★★</div>
              <p className="mt-6 text-white/75 leading-relaxed text-lg">
                One of the best Ayurvedic brands I have tried. Smooth ordering,
                premium ingredients, and fast delivery.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#31553f]"></div>
                <div>
                  <h4 className="text-white font-semibold">Neha Joshi</h4>
                  <p className="text-white/50 text-sm">Rajkot</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="py-28 px-6 bg-[#fdfcf8]">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-[#173926]">Wellness Journal</h2>
            <p className="mt-5 text-[#5f6b64] text-lg max-w-2xl mx-auto">
              Explore Ayurvedic wisdom, wellness routines,
              nutrition tips, and healthy lifestyle guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="bg-white rounded-[35px] overflow-hidden shadow-xl border border-[#e5ece6] hover:-translate-y-2 transition-all duration-500">
              <div className="h-[250px] bg-gradient-to-br from-[#2f5d43] to-[#173926]"></div>
              <div className="p-8">
                <span className="text-sm uppercase tracking-[3px] text-[#c3955d]">Ayurveda</span>
                <h3 className="mt-4 text-2xl font-bold text-[#173926] leading-snug">Daily Ayurvedic Habits For Better Energy</h3>
                <p className="mt-4 text-[#5f6b64] leading-relaxed">
                  Discover simple wellness habits that improve digestion, focus, and natural energy levels.
                </p>
                <button className="mt-6 text-[#173926] font-semibold hover:text-[#c3955d] transition">Read More →</button>
              </div>
            </div>

            <div className="bg-white rounded-[35px] overflow-hidden shadow-xl border border-[#e5ece6] hover:-translate-y-2 transition-all duration-500">
              <div className="h-[250px] bg-gradient-to-br from-[#6a5630] to-[#2d2412]"></div>
              <div className="p-8">
                <span className="text-sm uppercase tracking-[3px] text-[#c3955d]">Nutrition</span>
                <h3 className="mt-4 text-2xl font-bold text-[#173926] leading-snug">Herbal Nutrition For Modern Lifestyle</h3>
                <p className="mt-4 text-[#5f6b64] leading-relaxed">
                  Learn how Ayurvedic superfoods support immunity, stamina, and complete wellness.
                </p>
                <button className="mt-6 text-[#173926] font-semibold hover:text-[#c3955d] transition">Read More →</button>
              </div>
            </div>

            <div className="bg-white rounded-[35px] overflow-hidden shadow-xl border border-[#e5ece6] hover:-translate-y-2 transition-all duration-500">
              <div className="h-[250px] bg-gradient-to-br from-[#294838] to-[#13261d]"></div>
              <div className="p-8">
                <span className="text-sm uppercase tracking-[3px] text-[#c3955d]">Wellness</span>
                <h3 className="mt-4 text-2xl font-bold text-[#173926] leading-snug">Building A Healthy Daily Wellness Routine</h3>
                <p className="mt-4 text-[#5f6b64] leading-relaxed">
                  Create balanced daily routines inspired by ancient Ayurvedic wellness principles.
                </p>
                <button className="mt-6 text-[#173926] font-semibold hover:text-[#c3955d] transition">Read More →</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="py-28 px-6 bg-gradient-to-br from-[#1a3f2c] to-[#10251a] relative">

        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#c3955d]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-[#4fa46d]/20 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">

          <span className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white/70 text-sm tracking-[3px] uppercase backdrop-blur-md">
            Wellness Newsletter
          </span>

          <h2 className="mt-8 text-5xl md:text-6xl font-black text-white leading-tight">
            Stay Connected <br />
            With <span className="text-[#c3955d]">Velveta</span>
          </h2>

          <p className="mt-8 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Get wellness tips, Ayurvedic knowledge, premium offers,
            and exclusive product launches directly to your inbox.
          </p>

          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-7 py-5 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl outline-none text-white w-full md:w-[450px] placeholder:text-white/40"
            />
            <button className="px-8 py-5 rounded-full bg-[#c3955d] hover:bg-[#ddb57f] text-black font-semibold transition-all duration-300 hover:scale-105">
              Subscribe Now
            </button>
          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-28 px-6 bg-[#173926] text-white relative overflow-hidden">

        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#c3955d]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-[#4fa46d]/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">

          {/* LEFT */}
          <div>
            <span className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white/70 text-sm tracking-[3px] uppercase backdrop-blur-md">
              Contact Us
            </span>
            <h2 className="mt-8 text-5xl md:text-6xl font-black leading-tight">
              Let's Build <br />
              Healthy Living Together
            </h2>
            <p className="mt-8 text-white/70 text-lg leading-relaxed max-w-xl">
              Connect with Velveta Naturals for wellness guidance,
              premium Ayurvedic products, partnerships, and support.
            </p>
            <div className="mt-10 space-y-5">
              <div>
                <p className="text-white/40 uppercase text-sm tracking-[3px]">Email</p>
                <h4 className="text-2xl font-semibold mt-2">support@velveta.com</h4>
              </div>
              <div>
                <p className="text-white/40 uppercase text-sm tracking-[3px]">Phone</p>
                <h4 className="text-2xl font-semibold mt-2">+91 99999 99999</h4>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10">
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/10 outline-none placeholder:text-white/40"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/10 outline-none placeholder:text-white/40"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/10 outline-none placeholder:text-white/40 resize-none"
              ></textarea>
              <button className="w-full py-5 rounded-2xl bg-[#c3955d] hover:bg-[#ddb57f] text-black font-semibold transition-all duration-300 hover:scale-[1.02]">
                Send Message
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#10251a] text-white pt-24 pb-10 px-6">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-14">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#c3955d] flex items-center justify-center text-black font-bold text-xl">V</div>
              <div>
                <h2 className="text-2xl font-bold">Velveta</h2>
                <p className="text-white/50 text-xs tracking-[3px] uppercase">Naturals</p>
              </div>
            </div>
            <p className="mt-6 text-white/60 leading-relaxed">
              Premium Ayurvedic wellness products crafted
              with natural ingredients for modern healthy lifestyles.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Quick Links</h3>
            <div className="flex flex-col gap-3 text-white/60">
              <a href="#home" className="hover:text-white transition">Home</a>
              <a href="#products" className="hover:text-white transition">Products</a>
              <a href="#about" className="hover:text-white transition">About</a>
              <a href="#contact" className="hover:text-white transition">Contact</a>
            </div>
          </div>

          {/* PRODUCTS */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Products</h3>
            <div className="flex flex-col gap-3 text-white/60">
              <a href="#" className="hover:text-white transition">Arogya Churn</a>
              <a href="#" className="hover:text-white transition">B12 Super Food</a>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Newsletter</h3>
            <p className="text-white/60 mb-5">Subscribe for wellness updates and offers.</p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-4 rounded-full bg-white/10 border border-white/10 outline-none text-white placeholder:text-white/40"
              />
              <button className="px-5 py-4 rounded-full bg-[#c3955d] hover:bg-[#ddb57f] text-black font-semibold transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/40 text-sm">
          © 2026 Velveta Naturals. All Rights Reserved.
        </div>

      </footer>

    </main>
  );
}