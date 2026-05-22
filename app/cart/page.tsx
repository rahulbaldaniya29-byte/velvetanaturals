'use client';

import { useEffect, useState } from 'react';

export default function CartPage() {

  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    setCart(storedCart);

  }, []);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (

    <main className="min-h-screen bg-[#fdfcf8] p-10">

      <h1 className="text-5xl font-black text-[#173926] mb-10">
        Your Cart
      </h1>

      <div className="grid gap-6">

        {cart.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-[30px] p-8 shadow-xl border border-[#e5ebe7]"
          >

            <h2 className="text-2xl font-bold text-[#173926]">
              {item.name}
            </h2>

            <p className="mt-3 text-[#5a685f] text-lg">
              ₹{item.price}
            </p>

          </div>

        ))}

      </div>

      <div className="mt-10">

        <h2 className="text-3xl font-black text-[#173926]">
          Total: ₹{total}
        </h2>

      </div>

    </main>

  );
}