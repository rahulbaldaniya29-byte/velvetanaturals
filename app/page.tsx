'use client';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
export default function HomePage() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

const [messageName, setMessageName] = useState('');
const [messageEmail, setMessageEmail] = useState('');
const [messageText, setMessageText] = useState('');

const [sending, setSending] = useState(false);
const [successMessage, setSuccessMessage] = useState('');

const [heroOffset, setHeroOffset] = useState({
  x: 0,
  y: 0,
});
useEffect(() => {

  const cart =
    JSON.parse(localStorage.getItem('cart') || '[]');

  setCartCount(cart.length);

}, []);


const isValidEmail =
  messageEmail.includes('@') &&
  messageEmail.includes('.');
  useEffect(() => {

  const timer = setTimeout(() => {
    setLoading(false);
  }, 2200);

  return () => clearTimeout(timer);

}, []);
useEffect(() => {

  const interval = setInterval(() => {

    setCurrentImage((prev) =>
      prev === 0 ? 1 : 0
    );

  }, 2500);

  return () => clearInterval(interval);

}, []);

useEffect(() => {

  const moveCursor = (e: MouseEvent) => {

    

    setHeroOffset({
  x: (e.clientX - window.innerWidth / 2) / 40,
  y: (e.clientY - window.innerHeight / 2) / 40,
});

  };
  

  window.addEventListener('mousemove', moveCursor);

  return () => {
    window.removeEventListener('mousemove', moveCursor);
  };

}, []);

if (loading) {

  return (

    <div className="fixed inset-0 bg-[#10251a] flex items-center justify-center z-[99999]">

      <div className="text-center">

        <div className="w-28 h-28 rounded-full border-4 border-[#c3955d] border-t-transparent animate-spin mx-auto"></div>

        <h1 className="mt-10 text-5xl font-black text-[#c3955d] tracking-[6px]">
          VELVETA
        </h1>

        <p className="mt-4 text-white/50 tracking-[4px] uppercase text-sm">
          Luxury Wellness Experience
        </p>

      </div>

    </div>

  );

}
  return (
    <main className="min-h-screen bg-[#fdfcf8] relative overflow-hidden">
      <div className="fixed inset-0 opacity-[0.035] pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
      <div className="fixed inset-0 z-0 hidden md:block pointer-events-none">

  <div className="cursor-glow pointer-events-none"></div>

</div>
      <style jsx>{`
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>
      <style jsx>{`
      html {
  scroll-behavior: smooth;
}
      .cursor-glow {
  position: fixed;
  width: 220px;
  height: 220px;
  border-radius: 9999px;
  background: rgba(195, 149, 93, 0.18);
  filter: blur(90px);
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: glowMove 10s linear infinite;
}

@keyframes glowMove {
  0% {
    transform: translate(10vw, 10vh);
  }

  25% {
    transform: translate(80vw, 20vh);
  }

  50% {
    transform: translate(70vw, 70vh);
  }

  75% {
    transform: translate(20vw, 80vh);
  }

  100% {
    transform: translate(10vw, 10vh);
  }
}
@keyframes heroText {
  from {
    opacity: 0;
    transform: translateY(40px);
    letter-spacing: 10px;
  }

  to {
    opacity: 1;
    transform: translateY(0);
    letter-spacing: 0px;
  }
} 
  @keyframes gradientMove {

  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }

} 
@keyframes float {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-15px);
    }

    100% {
      transform: translateY(0px);
    }
  }
`}</style>


      {/* NAVBAR */}
<header className="fixed top-0 left-0 w-full z-[9999] bg-[#173926]/95 border-b border-white/10 shadow-lg">
<div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          {/* LOGO */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#d6b37a]">
            Velveta
          </h1>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-10 text-white">
            <a href="#home" className="hover:text-[#d6b37a] transition-all duration-300">Home</a>
            <a href="#products" className="hover:text-[#d6b37a] transition-all duration-300">Products</a>
            <a href="#about" className="hover:text-[#d6b37a] transition-all duration-300">Why Velveta</a>
            <a href="#contact" className="hover:text-[#d6b37a] transition-all duration-300">Contact</a>
          </nav>

          {/* RIGHT SIDE */}
<div className="flex items-center gap-2 md:gap-4">
              {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white text-2xl md:text-3xl"
            >
              {menuOpen ? '✕' : '☰'}
            </button>


            <button className="hidden md:block px-5 py-2 rounded-full bg-[#4f7c5d] text-white hover:bg-[#5e9170] transition">
              Shop Now
            </button>
            <button
  onClick={() => {
    window.location.href = '/cart';
  }}
  className="relative z-[999] px-3 md:px-5 py-2 text-sm md:text-base rounded-full bg-[#173926] text-white hover:bg-[#28543c] transition-all duration-300"
>
  🛒 Cart

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-[#c3955d] text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
      {cartCount}
    </span>
  )}

</button>
<button
  onClick={() => {
    window.location.href = '/orders';
  }}
  className="relative z-[999] px-3 md:px-5 py-2 text-sm md:text-base rounded-full bg-[#173926] text-white hover:bg-[#28543c] transition-all duration-300"
>
  My Orders
</button>

          </div>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mobile-menu md:hidden px-6 pb-5">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-5 text-white">
              <a href="#home" className="hover:text-[#d6b37a] transition">Home</a>
              <a href="#products" className="hover:text-[#d6b37a] transition">Products</a>
              <a href="#about" className="hover:text-[#d6b37a] transition">Why Velveta</a>
              <a href="#contact" className="hover:text-[#d6b37a] transition">Contact</a>
            </div>
          </div>
        )}

      </header>

      
      {/* HERO SECTION */}
      <section
  id="home"
  className="hero-grid relative min-h-screen overflow-hidden flex items-center justify-center px-6 pt-24 md:pt-0 bg-[linear-gradient(-45deg,#173926,#1f4d35,#0d2016,#2f5d43)] bg-[length:400%_400%] animate-[gradientMove_12s_ease_infinite]"
>

        {/* Glow Effects */}
        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-[#4fa46d]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-[#c3955d]/20 rounded-full blur-3xl animate-pulse"></div>

        {/* Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center relative z-10">

          {/* LEFT */}
          <div>
           

            <h1 className="fade-up mt-8 text-4xl sm:text-5xl md:text-7xl font-black leading-tight text-white animate-[heroText_1.2s_ease-out]">
              Natural <span className="text-[#c3955d]">Luxury</span> <br />
              For Modern Wellness
            </h1>

            <p className="fade-up mt-8 text-lg leading-relaxed text-white/70 max-w-xl">
              Discover powerful Ayurvedic formulations crafted with nature,
              science, and luxury wellness experience for modern lifestyles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button className="glow-button relative overflow-hidden px-8 py-4 rounded-full bg-[#c3955d] hover:bg-[#d9ab73] text-black font-semibold transition-all duration-300 hover:scale-105 shadow-2xl before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-white/30 before:skew-x-12 before:transition-all before:duration-700 hover:before:left-[200%]">
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
  src={
    currentImage === 0
      ? '/product1.jpeg'
      : '/product2.jpeg'
  }
  alt='Velveta Product'
width={380}
height={380}
              className="object-contain h-auto relative z-10 transition-all duration-700 drop-shadow-[0_20px_80px_rgba(0,0,0,0.6)] floating-animation animate-[float_5s_ease-in-out_infinite]"
              style={{
  transform: `translate(${heroOffset.x}px, ${heroOffset.y}px)`,
}}
              priority

            />
          </div>

        </div>

      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-28 px-6 bg-[#fdfcf8] animate-[fadeUp_1s_ease-out]">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-[#173926]">Featured Products</h2>
            <p className="mt-5 text-[#4d5c54] max-w-2xl mx-auto text-lg">
              Discover our premium Ayurvedic wellness collection crafted
              from the finest natural ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* CARD 1 */}
            <div className="group glass-card premium-card rounded-[35px] overflow-hidden shadow-xl border border-[#dfe7e1] hover:-translate-y-3 hover:rotate-1 hover:shadow-2xl transition-all duration-500 transform-gpu">

              <div className="h-[380px] bg-gradient-to-br from-[#2f5d43] to-[#173926] flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl"></div>
                <Image
                  src="/product1.jpeg"
                  alt="Arogya Churn"
                  width={270}
                  height={270}
                  className="object-contain w-auto h-auto group-hover:scale-125 group-hover:rotate-2 transition-all duration-700 drop-shadow-2xl"
                />
              </div>

              <div className="p-5 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#173926]">Arogya Churn</h3>
                <p className="mt-4 text-[#5a685f] leading-relaxed">
                  Herbal Ayurvedic formula designed to improve digestion,
                  immunity, detoxification, and natural daily energy.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className="text-2xl md:text-3xl font-bold text-[#c3955d]">₹799</span>
                  
         <button
  onClick={() => {

localStorage.setItem(
  'checkoutCart',
  JSON.stringify([
    {
      name: 'Arogya Churn',
      price: 799,
      quantity: 1,
    }
  ])
);

window.location.href = '/checkout';
  }}

  className="relative z-[999]  mt-4 px-6 py-3 rounded-full bg-[#2f5d43] hover:bg-[#3c7353] hover:scale-105 hover:-translate-y-1 text-white transition-all duration-300 shadow-lg hover:shadow-2xl"
>
  Buy Now
</button>
<button
  onClick={() => {

    const existingCart =
      JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProductIndex =
  existingCart.findIndex(
    (item: any) => item.name === 'Arogya Churn'
  );

if (existingProductIndex !== -1) {

  existingCart[existingProductIndex].quantity += 1;

} else {

  existingCart.push({
    name: 'Arogya Churn',
    price: 799,
    quantity: 1,
  });

}

localStorage.setItem(
  'cart',
  JSON.stringify(existingCart)
);

setCartCount(existingCart.length);



  }}

  className="relative z-[999]  mt-4 px-6 py-3 rounded-full bg-[#2f5d43] hover:bg-[#3c7353] hover:scale-105 hover:-translate-y-1 text-white transition-all duration-300 shadow-lg hover:shadow-2xl"
>
  Add To Cart
</button>

                </div>
              </div>

            </div>

            {/* CARD 2 */}
            <div className="group glass-card premium-card rounded-[35px] overflow-hidden shadow-xl border border-[#dfe7e1] hover:-translate-y-3 hover:rotate-1 hover:shadow-2xl transition-all duration-500 transform-gpu">

              <div className="h-[380px] bg-gradient-to-br from-[#66552d] to-[#2d2412] flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl"></div>
                <Image
                  src="/product2.jpeg"
                  alt="B12 Super Food"
                  width={270}
                  height={270}
                  className="object-contain w-auto h-auto group-hover:scale-125 group-hover:rotate-2 transition-all duration-700 drop-shadow-2xl"
                />
              </div>

              <div className="p-5 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#173926]">B12 Super Food</h3>
                <p className="mt-4 text-[#5a685f] leading-relaxed">
                  Advanced herbal nutrition blend supporting stamina,
                  energy, immunity, and complete body wellness naturally.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className="text-2xl md:text-3xl font-bold text-[#c3955d]">₹999</span>
                  
         <button
  onClick={() => {

    localStorage.setItem(
  'checkoutCart',
  JSON.stringify([
    {
      name: 'B12 Super Food',
      price: 999,
      quantity: 1,
    }
  ])
);

window.location.href = '/checkout';

  }}

  className="relative z-[999] px-6 py-3 rounded-full bg-[#2f5d43] hover:bg-[#3c7353] hover:scale-105 hover:-translate-y-1 text-white transition-all duration-300 shadow-lg hover:shadow-2xl"
>
  Buy Now
</button>

<button
  onClick={() => {

    const existingCart =
      JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProductIndex =
  existingCart.findIndex(
    (item: any) => item.name === 'B12 Super Food'
  );

if (existingProductIndex !== -1) {

  existingCart[existingProductIndex].quantity += 1;

} else {

  existingCart.push({
    name: 'B12 Super Food',
    price: 999,
    quantity: 1,
  });

}

localStorage.setItem(
  'cart',
  JSON.stringify(existingCart)
);
setCartCount(existingCart.length);
  }}

  className="relative z-[999]  mt-4 px-6 py-3 rounded-full bg-[#2f5d43] hover:bg-[#3c7353] hover:scale-105 hover:-translate-y-1 text-white transition-all duration-300 shadow-lg hover:shadow-2xl"
>
  Add To Cart
</button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>



      
      {/* WHY CHOOSE US */}
      <section id="about" className="py-28 px-6 bg-[#f7f5ef] animate-[fadeUp_1s_ease-out]">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-[#173926]">Why Choose Velveta</h2>
            <p className="mt-5 text-[#5a685f] max-w-3xl mx-auto text-lg">
              Combining ancient Ayurvedic wisdom with modern wellness science
              to deliver premium natural healing experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="bg-white rounded-[30px] p-6 md:p-10 shadow-xl border border-[#e5ebe7] hover:-translate-y-2 transition-all duration-500">
              <div className="w-20 h-20 rounded-full bg-[#e4efe7] flex items-center justify-center text-4xl mb-8">🌿</div>
              <h3 className="text-2xl font-bold text-[#173926]">100% Natural</h3>
              <p className="mt-5 text-[#5a685f] leading-relaxed">
                Pure herbal ingredients carefully selected from trusted
                Ayurvedic sources without harmful chemicals.
              </p>
            </div>

            <div className="bg-white rounded-[30px] p-6 md:p-10 shadow-xl border border-[#e5ebe7] hover:-translate-y-2 transition-all duration-500">
              <div className="w-20 h-20 rounded-full bg-[#f1e7d7] flex items-center justify-center text-4xl mb-8">✨</div>
              <h3 className="text-2xl font-bold text-[#173926]">Luxury Wellness</h3>
              <p className="mt-5 text-[#5a685f] leading-relaxed">
                Premium quality wellness products designed for modern healthy
                lifestyle and complete body balance.
              </p>
            </div>

            <div className="bg-white rounded-[30px] p-6 md:p-10 shadow-xl border border-[#e5ebe7] hover:-translate-y-2 transition-all duration-500">
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
      {/* CONTACT SECTION */}
      <section id="contact" className="py-28 px-6 bg-[#173926] text-white relative overflow-hidden animate-[fadeUp_1s_ease-out]">

        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#c3955d]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-[#4fa46d]/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center relative z-10">

          {/* LEFT */}
          <div>
            <span className="hidden md:block px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white/70 text-sm tracking-[3px] uppercase backdrop-blur-md">
              Contact Us
            </span>
            <h2 className="mt-8 text-3xl md:text-6xl font-black leading-tight">
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
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-5 md:p-10">
            <div className="space-y-5">
              <input
  type="text"
  placeholder="Your Name"
  value={messageName}
  onChange={(e) => setMessageName(e.target.value)}
  className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/10 outline-none placeholder:text-white/40"
/>
              <input
  type="email"
  placeholder="Your Email"
  value={messageEmail}
  onChange={(e) => setMessageEmail(e.target.value)}
  className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/10 outline-none placeholder:text-white/40"
/>
{messageEmail && !isValidEmail && (
  <p className="text-red-300 text-sm mt-2">
    Please enter valid email address
  </p>
)}
             <textarea
  placeholder="Your Message"
  rows={5}
  value={messageText}
  onChange={(e) => setMessageText(e.target.value)}
  className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/10 outline-none placeholder:text-white/40 resize-none"
></textarea>
           <button
  onClick={async () => {

  if (
    !messageEmail.includes('@') ||
    !messageEmail.includes('.')
  ) {
    setSuccessMessage('Please enter valid email 😄');
    return;
  }

  setSending(true);

  await supabase
    .from('messages')
    .insert([
      {
        name: messageName,
        email: messageEmail,
        message: messageText,
      }
    ]);

  setMessageName('');
  setMessageEmail('');
  setMessageText('');
  setSuccessMessage('sent');
  setTimeout(() => {
  setSuccessMessage('');
}, 2500);
  

  setSending(false);

  



}}
  className="w-full py-5 rounded-2xl bg-[#c3955d] hover:bg-[#ddb57f] text-black font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95"
>
  {sending ? 'Sending...' : 'Send Message'}
</button>
{successMessage && (
  <div className="mt-5 bg-green-500/20 border border-green-400/30 text-green-200 px-5 py-4 rounded-2xl text-center backdrop-blur-md animate-pulse">
    ✓ Message Sent Successfully
  </div>
)}
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
              <a href="#about" className="hover:text-white transition">Why Velveta</a>
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

</div>
        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/40 text-sm">
          © 2026 Velveta Naturals. All Rights Reserved.
        </div>

      </footer>

    </main>
  );
}