'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TrackPage() {

  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<any[]>([]);

  const searchOrders = async () => {

    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_phone', phone)
      .order('id', { ascending: false });

    if (data) {
      setOrders(data);
    }

  };

  return (

    <main className="min-h-screen bg-[#f7f5ef] px-6 py-20">

      <div className="max-w-5xl mx-auto">

        <div className="text-center">

          <h1 className="text-5xl font-black text-[#173926]">
            Track Your Order
          </h1>

          <p className="mt-5 text-[#5a685f] text-lg">
            Enter your phone number to check order status
          </p>

        </div>

        <div className="mt-12 bg-white rounded-[35px] p-8 shadow-xl border border-[#e5ebe7]">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 px-5 py-4 rounded-2xl border border-[#dfe7e1] outline-none"
            />

            <button
              onClick={searchOrders}
              className="px-8 py-4 rounded-2xl bg-[#173926] hover:bg-[#28543c] text-white font-semibold transition-all duration-300"
            >
              Track Order
            </button>

          </div>

        </div>

        <div className="mt-10 grid gap-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white rounded-[30px] p-8 shadow-xl border border-[#e5ebe7]"
            >

              <div className="flex items-center justify-between flex-wrap gap-5">

                <div>

                  <h2 className="text-3xl font-bold text-[#173926]">
                    {order.product_name}
                  </h2>

                  <p className="mt-2 text-[#c3955d] text-2xl font-bold">
                    ₹{order.amount}
                  </p>

                </div>

                <div className="px-6 py-3 rounded-full bg-[#173926] text-white font-semibold">
                  {order.status}
                </div>

              </div>

              <div className="mt-8">

                <p className="text-sm text-[#5a685f]">
                  Delivery Address
                </p>

                <div className="mt-2 bg-[#f7f5ef] p-5 rounded-2xl text-[#173926]">
                  {order.customer_address}
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>

  );
}