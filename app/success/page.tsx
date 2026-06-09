'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Dynamically import canvas-confetti to avoid TypeScript/module resolution
    // errors during server-side build and when types are not available.
    (async () => {
      try {
        const mod = await import('canvas-confetti' as any);
        const confetti = (mod && (mod.default || mod)) as any;
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 180,
            spread: 120,
            origin: { y: 0.6 },
          });
        }
      } catch (err) {
        // fail silently if the package isn't available in the environment
        // (e.g., during some build steps)
        // console.warn('confetti not available', err);
      }
    })();
  }, []);
  useEffect(() => {
  const timer = setTimeout(() => {
    router.push('/');
  }, 20000);

  return () => clearTimeout(timer);
}, [router]);

  return (

    <main className="min-h-screen flex items-center justify-center bg-[#fdfcf8] px-6">

      <div className="max-w-xl w-full bg-white rounded-[40px] shadow-2xl p-12 text-center border border-[#e7ece8]">

        <div className="w-28 h-28 rounded-full bg-gradient-to-r from-[#173926] to-[#28543c] text-white flex items-center justify-center text-6xl mx-auto shadow-2xl animate-bounce">
          ✓
        </div>
<p className="text-[#c3955d] font-bold tracking-[3px] uppercase">
  Order Confirmed
</p>
        <h1 className="mt-8 text-5xl font-black text-[#173926]">
          Payment Successful
        </h1>

        <p className="mt-6 text-[#5a685f] text-lg leading-relaxed">
          Your order has been placed successfully.
          
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-5 justify-center">

  <a
    href="/orders"
    className="px-8 py-4 rounded-3xl bg-gradient-to-r from-[#173926] to-[#28543c] text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
  >
    Track My Order
  </a>

  <a
    href="/"
    className="px-8 py-4 rounded-3xl border-2 border-[#173926] text-[#173926] font-semibold hover:bg-[#173926] hover:text-white transition-all duration-300 hover:scale-105"
  >
    Continue Shopping
  </a>

</div>
<p className="mt-8 text-sm text-gray-500">
  You will be redirected to the home page in 20 seconds.
</p>

      </div>

    </main>

  );
}