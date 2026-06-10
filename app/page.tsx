'use client';
import Image from 'next/image';
import { Share2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useEffect, useState, useRef } from 'react';

export default function HomePage() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
const [accountMenu, setAccountMenu] = useState(false);
  
const [messageName, setMessageName] = useState('');
const [messageEmail, setMessageEmail] = useState('');
const [messageText, setMessageText] = useState('');
const accountMenuRef = useRef<HTMLDivElement>(null);
const [sending, setSending] = useState(false);
const [successMessage, setSuccessMessage] = useState('');

const [heroOffset, setHeroOffset] = useState({
  x: 0,
  y: 0,
});
useEffect(() => {
  const handleClickOutside = (event: Event) => {
    if (
      accountMenuRef.current &&
      !accountMenuRef.current.contains(
        event.target as Node
      )
    ) {
      setAccountMenu(false);
    }
  };

  document.addEventListener(
    'mousedown',
    handleClickOutside
  );

  document.addEventListener(
    'touchstart',
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      'mousedown',
      handleClickOutside
    );

    document.removeEventListener(
      'touchstart',
      handleClickOutside
    );
  };
}, []);
useEffect(() => {

  const updateCart = () => {

    const cart =
      JSON.parse(
        localStorage.getItem('cart') || '[]'
      );

    const totalItems = cart.reduce(
      (acc: number, item: any) =>
        acc + (item.quantity || 1),
      0
    );

    setCartCount(totalItems);

  };

  updateCart();

  const interval = setInterval(() => {
    updateCart();
  }, 500);

  return () => clearInterval(interval);

}, []);
useEffect(() => {

  const email =
    localStorage.getItem(
      'customerEmail'
    );

  setLoggedIn(!!email);

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
       <div className="flex items-center">
  <Image
    src="/logo.png"
    alt="Velveta Naturals"
    width={110}
    height={38}
    priority
    className="h-9 w-auto object-contain drop-shadow-md"
  />
</div>
          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-10 text-white">
<a
  href="#home"
  onClick={() => setMenuOpen(false)}
  className="hover:text-[#d6b37a] transition"
>
  Home
</a>

<a
  href="#products"
  onClick={() => setMenuOpen(false)}
  className="hover:text-[#d6b37a] transition"
>
  Products
</a>

<a
  href="#about"
  onClick={() => setMenuOpen(false)}
  className="hover:text-[#d6b37a] transition"
>
  Why Velveta
</a>

<a
  href="#contact"
  onClick={() => setMenuOpen(false)}
  className="hover:text-[#d6b37a] transition"
>
  Contact
</a>
          </nav>
          
          

          {/* RIGHT SIDE */}
<div className="flex items-center gap-3 md:gap-4">
              


            <button onClick={() => {

  document
    .getElementById('products')
    ?.scrollIntoView({
      behavior: 'smooth',
    });

}}
 className="hidden md:block px-5 py-2 rounded-full bg-[#4f7c5d] text-white hover:bg-[#5e9170] transition">
              Shop Now
            </button>
            
            <button
  onClick={() => {
    window.location.href = '/cart';
  }}
  className="relative z-[999] px-2 sm:px-3 md:px-5 py-2 text-xs md:text-base rounded-full bg-gradient-to-r from-[#173926] to-[#28543c] text-white shadow-lg hover:bg-[#28543c] transition-all duration-300"
>
  🛒 Cart

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-[#c3955d] text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
      {cartCount}
    </span>
  )}

</button>
<div
  className="relative"
  ref={accountMenuRef}
>

  <button
    onClick={() => {
      if (!loggedIn) {
        window.location.href = '/account/login';
        return;
      }

      setAccountMenu(!accountMenu);
    }}
    className="px-3 md:px-5 py-2 rounded-full bg-gradient-to-r from-[#173926] to-[#28543c] text-white text-sm md:text-base shadow-lg"
  >
    {loggedIn ? 'Account' : 'Login'}
  </button>

  {loggedIn && accountMenu && (
   <div
  className="absolute top-14 right-0 bg-white rounded-3xl shadow-2xl border border-gray-100 w-56 overflow-hidden z-50"
>
      <button
  onClick={() => window.location.href='/account'}
  className="w-full flex items-center gap-3 px-5 py-4 text-[#173926] font-semibold hover:bg-[#f7f5ef] hover:pl-7 transition-all duration-300 border-b border-gray-100"
>
  <span className="text-lg">👤</span>
  <span>My Account</span>
</button>

      <button
  onClick={() => window.location.href='/orders'}
  className="w-full flex items-center gap-3 px-5 py-4 text-[#173926] font-semibold hover:bg-[#f7f5ef] hover:pl-7 transition-all duration-300 border-b border-gray-100"
>
  <span className="text-lg">📦</span>
  <span>My Orders</span>
</button>

      <button
  onClick={() => {
    localStorage.removeItem('customerEmail');
    window.location.href = '/';
  }}
  className="w-full flex items-center gap-3 px-5 py-4 text-red-500 font-semibold hover:bg-red-50 hover:pl-7 transition-all duration-300"
>
  <span className="text-lg">🚪</span>
  <span>Logout</span>
</button>

    </div>
    
  )}
  <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden ml-1 text-white text-2xl"
>
  ☰
</button>

</div>

          </div>

        </div>

        {/* MOBILE MENU */}
{menuOpen && (
  <div className="mobile-menu md:hidden absolute top-full left-0 w-full px-4 pb-4 z-[9999]">
    <div className="bg-white rounded-[28px] shadow-2xl border border-[#e5ebe7] overflow-hidden">

      <a
        href="#home"
        onClick={() => setMenuOpen(false)}
        className="block px-6 py-4 text-[#173926] font-medium hover:bg-[#f7f5ef] transition-all duration-300"
      >
        Home
      </a>

      <a
        href="#products"
        onClick={() => setMenuOpen(false)}
        className="block px-6 py-4 text-[#173926] font-medium border-t border-[#edf1ee] hover:bg-[#f7f5ef] transition-all duration-300"
      >
        Products
      </a>

      <a
        href="#about"
        onClick={() => setMenuOpen(false)}
        className="block px-6 py-4 text-[#173926] font-medium border-t border-[#edf1ee] hover:bg-[#f7f5ef] transition-all duration-300"
      >
        Why Velveta
      </a>

      <a
        href="#contact"
        onClick={() => setMenuOpen(false)}
        className="block px-6 py-4 text-[#173926] font-medium border-t border-[#edf1ee] hover:bg-[#f7f5ef] transition-all duration-300"
      >
        Contact
      </a>

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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-14 items-center text-center md:text-left relative z-10">

          {/* LEFT */}
          <div>
           

            <h1 className="fade-up mt-6 text-3xl sm:text-5xl md:text-7xl font-black leading-tight text-white text-center md:text-left animate-[heroText_1.2s_ease-out]">
              Natural <span className="text-[#c3955d]">Luxury</span> <br />
              For Modern Wellness
            </h1>

            <p className="fade-up mt-6 text-base md:text-lg leading-relaxed text-white/70 max-w-xl text-center md:text-left">
              Discover powerful Ayurvedic formulations crafted with nature,
              science, and luxury wellness experience for modern lifestyles.
            </p>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center order-first md:order-last">
            <div className="absolute w-[450px] h-[450px] rounded-full bg-[#ffffff10] blur-3xl"></div>
            <Image
  src={
    currentImage === 0
      ? '/product1.jpeg'
      : '/product2.jpeg'
  }
  alt='Velveta Product'
width={320}
height={320}
              className="object-contain w-[220px] sm:w-[260px] md:w-auto h-auto relative z-10 transition-all duration-700 drop-shadow-[0_20px_80px_rgba(0,0,0,0.6)] floating-animation animate-[float_5s_ease-in-out_infinite]"
              style={{
  transform: `translate(${heroOffset.x}px, ${heroOffset.y}px)`,
}}
              priority

            />
          </div>

        </div>

      </section>

      {/* PRODUCTS */}
      <section
  id="products"
  className="py-32 px-4 md:px-6 bg-gradient-to-b from-[#fdfcf8] to-[#f5f1e8]"
>

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-24">
  <h2 className="text-4xl md:text-6xl font-black text-[#173926] tracking-tight">
    Featured Products
  </h2>

  <p className="mt-6 text-[#66756d] max-w-2xl mx-auto text-lg leading-relaxed">
    Discover our premium Ayurvedic wellness collection crafted
    from the finest natural ingredients.
  </p>
</div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* CARD 1 */}
            <div className="group overflow-hidden rounded-[40px] bg-white border border-[#e7ebe7] shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-500">

              <div className="h-[320px] md:h-[420px] bg-gradient-to-br from-[#173926] via-[#214a33] to-[#2f5d43] flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl"></div>
                <Image
                  src="/product1.jpeg"
                  alt="Arogya Churn"
                  width={320}
height={320}
                  className="object-cover w-auto h-auto group-hover:scale-110 transition-all duration-700 drop-shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                />
              </div>

              <div className="p-8 md:p-10 flex flex-col h-full text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-black text-[#173926]">Arogya Churn</h3>
                <p className="mt-5 text-[#5a685f] leading-relaxed text-[15px] md:text-base">
                  Herbal Ayurvedic formula designed to improve digestion,
                  immunity, detoxification, and natural daily energy.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <span className="text-4xl font-black text-[#173926]">₹799</span>
                  
         <button
onClick={() => {
  const email = localStorage.getItem('customerEmail');

  if (!email) {
    localStorage.setItem('redirectAfterLogin', '/checkout');
    window.location.href = '/account/login';
    return;
  }

  localStorage.setItem(
    'checkoutCart',
    JSON.stringify([
      {
        id: 'cart1',
        name: 'Arogya Churn',
        price: 799,
        quantity: 1,
      },
    ])
  );

  window.location.href = '/checkout';
}}

className="flex-1 py-4 rounded-2xl bg-[#173926] hover:bg-[#28543c] text-white font-semibold transition-all duration-300 shadow-lg">
  Buy Now
</button>
<button
  onClick={() => {

    const existingCart =
      JSON.parse(localStorage.getItem('cart') || '[]');

const existingProductIndex =
  existingCart.findIndex(
    (item: any) => item.id === 'cart1'
  );

if (existingProductIndex !== -1) {

  existingCart[existingProductIndex].quantity += 1;

} else {

existingCart.push({
  id: 'cart1',
  name: 'Arogya Churn',
  price: 799,
  quantity: 1,
});

}

localStorage.setItem(
  'cart',
  JSON.stringify(existingCart)
);
window.dispatchEvent(
  new Event('cartUpdated')
);


const totalItems = existingCart.reduce(
  (acc: number, item: any) =>
    acc + (item.quantity || 1),
  0
);

setCartCount(totalItems);



  }}
className="flex-1 py-4 rounded-2xl bg-[#c3955d] hover:bg-[#d1a167] text-black font-semibold transition-all duration-300 shadow-lg">
  Add To Cart
</button>
<button
  onClick={() => {
    const shareUrl = window.location.origin;

    if (navigator.share) {
      navigator.share({
        title: 'Arogya Churn',
        text: 'Check out Arogya Churn on Velveta Naturals',
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);

      alert('Product link copied ✓');
    }
  }}
className="w-full sm:w-auto px-5 py-4 rounded-2xl border border-[#173926] text-[#173926] hover:bg-[#173926] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
  <Share2 size={18} />
  Share
</button>

                </div>
              </div>

            </div>

            {/* CARD 2 */}
            <div className="group overflow-hidden rounded-[40px] bg-white border border-[#e7ebe7] shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-500">

              <div className="h-[320px] md:h-[420px] bg-gradient-to-br from-[#6f5830] via-[#4c3d20] to-[#2d2412] flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl"></div>
                <Image
                  src="/product2.jpeg"
                  alt="B12 Super Food"
width={320}
height={320}
                className="object-contain w-auto h-auto group-hover:scale-110 transition-all duration-700 drop-shadow-[0_20px_50px_rgba(0,0,0,0.35)]"/>
              </div>

              <div className="p-8 md:p-10 flex flex-col h-full text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-black text-[#173926]">B12 Super Food</h3>
                <p className="mt-5 text-[#5a685f] leading-relaxed text-[15px] md:text-base">
                  Advanced herbal nutrition blend supporting stamina,
                  energy, immunity, and complete body wellness naturally.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <span className="text-4xl font-black text-[#173926]">₹999</span>
                  
         <button
  onClick={() => {
  const email = localStorage.getItem('customerEmail');

  if (!email) {
    localStorage.setItem('redirectAfterLogin', '/checkout');
    window.location.href = '/account/login';
    return;
  }

  localStorage.setItem(
    'checkoutCart',
    JSON.stringify([
      {
        id: 'cart2',
        name: 'B12 Super Food',
        price: 999,
        quantity: 1,
      },
    ])
  );

  window.location.href = '/checkout';
}}
className="flex-1 py-4 rounded-2xl bg-[#173926] hover:bg-[#28543c] text-white font-semibold transition-all duration-300 shadow-lg">
  Buy Now
</button>

<button
  onClick={() => {

    const existingCart =
      JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProductIndex =
  existingCart.findIndex(
    (item: any) => item.id === 'cart2'
  );

if (existingProductIndex !== -1) {

  existingCart[existingProductIndex].quantity += 1;

} else {

existingCart.push({
  id: 'cart2',
  name: 'B12 Super Food',
  price: 999,
  quantity: 1,
});
}

localStorage.setItem(
  'cart',
  JSON.stringify(existingCart)
);
window.dispatchEvent(
  new Event('cartUpdated')
);
const totalItems = existingCart.reduce(
  (acc: number, item: any) =>
    acc + (item.quantity || 1),
  0
);

setCartCount(totalItems);


  }}

className="flex-1 py-4 rounded-2xl bg-[#c3955d] hover:bg-[#d1a167] text-black font-semibold transition-all duration-300 shadow-lg">
  Add To Cart
</button>
<button
  onClick={() => {
    const shareUrl = window.location.origin;

    if (navigator.share) {
      navigator.share({
        title: 'B12 Super Food',
        text: 'Check out B12 Super Food on Velveta Naturals',
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);

      alert('Product link copied ✓');
    }
  }}
  className="w-full sm:w-auto px-5 py-4 rounded-2xl border border-[#173926] text-[#173926] hover:bg-[#173926] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
  <Share2 size={18} />
  Share
</button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>



      
      {/* WHY CHOOSE US */}
      <section
  id="about"
  className="py-20 md:py-32 px-4 md:px-6 bg-[#f7f5ef]"
>

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-24">

  <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#173926] tracking-tight">
    Why Choose Velveta
  </h2>

  <p className="mt-6 text-[#66756d] max-w-3xl mx-auto text-lg leading-relaxed">
    Combining ancient Ayurvedic wisdom with modern wellness science
    to deliver premium natural healing experiences.
  </p>

</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="group bg-white rounded-[30px] md:rounded-[40px] p-6 md:p-10 border border-[#e7ebe7] shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-[#edf5ef] flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-all duration-300">🌿</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#173926]">100% Natural</h3>
              <p className="mt-5 text-[#66756d] leading-relaxed text-[15px] md:text-base">
                Pure herbal ingredients carefully selected from trusted
                Ayurvedic sources without harmful chemicals.
              </p>
            </div>
<div className="group bg-white rounded-[30px] md:rounded-[40px] p-6 md:p-10 border border-[#e7ebe7] shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-[#f8efe0] flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-all duration-300">✨</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#173926]">Luxury Wellness</h3>
              <p className="mt-5 text-[#66756d] leading-relaxed text-[15px] md:text-base">
                Premium quality wellness products designed for modern healthy
                lifestyle and complete body balance.
              </p>
            </div>
<div className="group bg-white rounded-[30px] md:rounded-[40px] p-6 md:p-10 border border-[#e7ebe7] shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-[#edf5ef] flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-all duration-300">🛡️</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#173926]">Trusted Formula</h3>
              <p className="mt-5 text-[#66756d] leading-relaxed text-[15px] md:text-base">
                Scientifically crafted Ayurvedic blends focused on immunity,
                energy, digestion, and overall wellness.
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* CONTACT SECTION */}
<section
  id="contact"
  className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-[#173926] via-[#1d4933] to-[#10251a] text-white relative overflow-hidden"
>
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#c3955d]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-[#4fa46d]/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

          {/* LEFT */}
          <div>
            <span className="inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white/70 text-xs md:text-sm tracking-[2px] uppercase backdrop-blur-md">
              Contact Us
            </span>
            <h2 className="mt-6 text-3xl sm:text-4xl md:text-6xl font-black leading-tight">
              Let's Build <br />
              Healthy Living Together
            </h2>
            <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
              Connect with Velveta Naturals for wellness guidance,
              premium Ayurvedic products, partnerships, and support.
            </p>
            <div className="mt-10 space-y-5">
              <div>
                <p className="text-white/40 uppercase text-sm tracking-[3px]">Email</p>
                <h4 className="text-lg md:text-2xl font-semibold mt-2 break-all">support@velveta.com</h4>
              </div>
              <div>
                <p className="text-white/40 uppercase text-sm tracking-[3px]">Phone</p>
                <h4 className="text-lg md:text-2xl font-semibold mt-2 break-all">+91 99999 99999</h4>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[30px] md:rounded-[40px] p-5 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <div className="space-y-5">
              <input
  type="text"
  placeholder="Your Name"
  value={messageName}
  onChange={(e) => setMessageName(e.target.value)}
  className="w-full px-5 md:px-6 py-4 md:py-5 rounded-2xl bg-white/10 border border-white/10 outline-none placeholder:text-white/40 focus:border-[#c3955d] transition-all"
/>
              <input
  type="email"
  placeholder="Your Email"
  value={messageEmail}
  onChange={(e) => setMessageEmail(e.target.value)}
  className="w-full px-5 md:px-6 py-4 md:py-5 rounded-2xl bg-white/10 border border-white/10 outline-none placeholder:text-white/40 focus:border-[#c3955d] transition-all"
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
className="w-full px-5 md:px-6 py-4 md:py-5 rounded-2xl bg-white/10 border border-white/10 outline-none placeholder:text-white/40 resize-none focus:border-[#c3955d] transition-all"></textarea>
           <button
  onClick={async () => {

  if (
  !messageEmail.includes('@') ||
  !messageEmail.includes('.')
) {
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

setSuccessMessage(
  'Message Sent Successfully ✅'
);
  setTimeout(() => {
  setSuccessMessage('');
}, 2500);
  

  setSending(false);

  



}}
className="w-full py-4 md:py-5 rounded-2xl bg-[#c3955d] hover:bg-[#ddb57f] text-black font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg">
  {sending ? 'Sending...' : 'Send Message'}
</button>
{successMessage && successMessage !== 'sent' && (
  <p className="text-green-300 text-sm mt-2">
  {successMessage}
</p>
)}
            </div>
          </div>

        </div>

      </section>

      {/* FOOTER */}
<footer className="bg-gradient-to-b from-[#10251a] to-[#08150f] text-white pt-20 md:pt-24 pb-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-14 h-14 rounded-2xl bg-[#c3955d] flex items-center justify-center text-black font-black text-xl shadow-lg">V</div>
              <div>
                <h2 className="text-2xl font-bold">Velveta</h2>
                <p className="text-white/50 text-xs tracking-[3px] uppercase">Naturals</p>
              </div>
            </div>
            <p className="mt-6 text-white/60 leading-relaxed text-sm md:text-base text-center sm:text-left">
              Premium Ayurvedic wellness products crafted
              with natural ingredients for modern healthy lifestyles.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-xl font-bold mb-5 text-[#c3955d]">Quick Links</h3>
            <div className="flex flex-col gap-3 text-white/60 text-sm md:text-base">
              <a href="#home" className="hover:text-[#c3955d] transition-all duration-300">Home</a>
              <a href="#products" className="hover:text-[#c3955d] transition-all duration-300">Products</a>
              <a href="#about" className="hover:text-[#c3955d] transition-all duration-300">Why Velveta</a>
              <a href="#contact" className="hover:text-[#c3955d] transition-all duration-300">Contact</a>
            </div>
          </div>

          {/* PRODUCTS */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Products</h3>
            <div className="flex flex-col gap-3 text-white/60">
              <a href="#products" className="hover:text-white transition">
  Arogya Churn
</a>

<a href="#products" className="hover:text-white transition">
  B12 Super Food
</a>
            </div>
          </div>

</div>
        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-14 pt-8 text-center text-white/40 text-xs md:text-sm">
          © 2026 Velveta Naturals. All Rights Reserved.
        </div>

      </footer>

    </main>
  );
}