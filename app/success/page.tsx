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

        <div className="w-24 h-24 rounded-full bg-[#173926] text-white flex items-center justify-center text-5xl mx-auto animate-pulse">
          ✓
        </div>

        <h1 className="mt-8 text-5xl font-black text-[#173926]">
          Payment Successful
        </h1>

        <p className="mt-6 text-[#5a685f] text-lg leading-relaxed">
          Your order has been placed successfully.
          <br />
          Our team will contact you shortly regarding delivery updates.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-5 justify-center">

  <a
    href="/orders"
    className="px-8 py-4 rounded-2xl bg-[#173926] text-white hover:bg-[#28543c] transition-all duration-300 hover:scale-105"
  >
    Track My Order
  </a>

  <a
    href="/"
    className="px-8 py-4 rounded-2xl border border-[#173926] text-[#173926] hover:bg-[#173926] hover:text-white transition-all duration-300 hover:scale-105"
  >
    Continue Shopping
  </a>

</div>

      </div>

    </main>

  );
}