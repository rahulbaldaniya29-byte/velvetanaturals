'use client';
export default function SuccessPage() {

  return (

    <main className="min-h-screen flex items-center justify-center bg-[#fdfcf8] px-6">

      <div className="max-w-xl w-full bg-white rounded-[40px] shadow-2xl p-12 text-center border border-[#e7ece8]">

        <div className="w-24 h-24 rounded-full bg-[#173926] text-white flex items-center justify-center text-5xl mx-auto animate-bounce">
          ✓
        </div>

        <h1 className="mt-8 text-5xl font-black text-[#173926]">
          Payment Successful
        </h1>

        <p className="mt-6 text-[#5a685f] text-lg leading-relaxed">
  Your order has been placed successfully.
  Our team will contact you shortly regarding delivery updates.
</p>

        <div className="mt-10 flex flex-col md:flex-row gap-5 justify-center">

  <a
    href="/track"
    className="px-8 py-4 rounded-2xl bg-[#173926] hover:bg-[#28543c] text-white font-semibold transition-all duration-300"
  >
    Track Order
  </a>

  <a
    href="/"
    className="px-8 py-4 rounded-2xl border border-[#173926] text-[#173926] hover:bg-[#173926] hover:text-white transition-all duration-300"
  >
    Continue Shopping
  </a>

</div>

      </div>

    </main>

  );
}