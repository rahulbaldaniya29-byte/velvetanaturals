'use client';
export default function SuccessPage() {

  return (

    <main className="min-h-screen flex items-center justify-center bg-[#fdfcf8] px-6">

      <div className="max-w-xl w-full bg-white rounded-[40px] shadow-2xl p-12 text-center border border-[#e7ece8]">

        <div className="w-24 h-24 rounded-full bg-[#173926] text-white flex items-center justify-center text-5xl mx-auto">
          ✓
        </div>

        <h1 className="mt-8 text-5xl font-black text-[#173926]">
          Payment Successful
        </h1>

        <p className="mt-6 text-[#5a685f] text-lg leading-relaxed">
          Thank you for purchasing from Velveta Naturals.
          Your order has been confirmed successfully.
        </p>

        <button
          onClick={() => window.location.href='/'}
          className="mt-10 px-8 py-4 rounded-full bg-[#173926] hover:bg-[#28543d] text-white transition-all duration-300"
        >
          Back To Home
        </button>

      </div>

    </main>

  );
}