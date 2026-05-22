'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  async function fetchOrders() {

    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setOrders(data);
    }

  }

  return (

    <main className="min-h-screen bg-[#f7f5ef] p-10">

      <h1 className="text-5xl font-black text-[#173926] mb-10">
        Orders Dashboard
      </h1>

      <div className="grid gap-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-white rounded-[30px] p-8 shadow-xl border border-[#e5ebe7]"
          >

            <h2 className="text-2xl font-bold text-[#173926]">
              {order.product_name}
            </h2>

            <p className="mt-3 text-[#5a685f] text-lg">
              Amount: ₹{order.amount}
            </p>

            <p className="mt-2 text-[#5a685f]">
              Customer: {order.customer_name}
            </p>

            <p className="mt-2 text-[#5a685f] break-all">
              Payment ID: {order.payment_id}
            </p>

          </div>

        ))}

      </div>

    </main>

  );
}