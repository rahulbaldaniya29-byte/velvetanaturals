'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function OrdersPage() {

  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const statusSteps = [
  'Order Placed',
  'Packed',
  'Shipped',
  'Out For Delivery',
  'Delivered',
];

  const fetchOrders = async () => {

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

    <main className="min-h-screen bg-[#fdfcf8] px-6 py-20">

      <div className="max-w-6xl mx-auto">

        <div className="text-center">

          <h1 className="text-5xl font-black text-[#173926]">
            My Orders
          </h1>

          <p className="mt-5 text-[#5a685f] text-lg">
            Enter your phone number to view all orders
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
              onClick={fetchOrders}
              className="px-8 py-4 rounded-2xl bg-[#173926] hover:bg-[#28543c] text-white font-semibold transition-all duration-300"
            >
              View Orders
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

                  <p className="mt-3 text-[#c3955d] text-2xl font-bold">
                    ₹{order.amount}
                  </p>

                </div>

                <div
  className={`px-6 py-3 rounded-full text-white font-bold shadow-lg ${
    order.status === 'Order Placed'
      ? 'bg-gradient-to-r from-green-500 to-emerald-600'
      : order.status === 'Packed'
      ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
      : order.status === 'Shipped'
      ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
      : order.status === 'Out For Delivery'
      ? 'bg-gradient-to-r from-orange-500 to-red-500'
      : 'bg-gradient-to-r from-green-700 to-emerald-900'
  }`}
>
  {order.status}
</div>
<div className="mt-8 flex flex-wrap gap-4">

  {statusSteps.map((step, index) => {

    const currentStep =
      statusSteps.indexOf(order.status);

    const isCompleted =
      index <= currentStep;

    return (

      <div
        key={step}
        className={`
          px-5
          py-3
          rounded-full
          text-white
          font-semibold
          transition-all
          duration-300
          ${
            isCompleted
              ? 'bg-[#173926]'
              : 'bg-gray-300'
          }
        `}
      >
        {step}
      </div>

    );

  })}

</div>

              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-6">

                <div className="bg-[#f7f5ef] p-5 rounded-2xl">

                  <p className="text-sm text-[#5a685f]">
                    Delivery Address
                  </p>

                  <p className="mt-2 text-[#173926] font-semibold">
                    {order.customer_address}
                  </p>

                </div>

                <div className="bg-[#f7f5ef] p-5 rounded-2xl">

                  <p className="text-sm text-[#5a685f]">
                    Ordered Date
                  </p>

                  <p className="mt-2 text-[#173926] font-semibold">
                    {order.order_date ? order.order_date : 'Date Not Available'}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>

  );

}